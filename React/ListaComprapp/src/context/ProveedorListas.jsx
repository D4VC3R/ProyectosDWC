import React from 'react'
import { useState, useEffect, createContext } from 'react';
import useSupabaseCRUD from '../hooks/useSupabaseCRUD';
import useSesionContext from '../hooks/useSesionContext';

const ContextoListas = createContext();

const ProveedorListas = ({ children }) => {

	// Valores iniciales
	const listaInicial = { nombre: '' }
	const listasIniciales = [];
	const itemsIniciales = [];

	// Estados
	const [listaActual, setListaActual] = useState(listaInicial);
	const [listas, setListas] = useState(listasIniciales);
	const [items, setItems] = useState(itemsIniciales);
	const [errorLista, setErrorLista] = useState('');
	const [mensajeExito, setMensajeExito] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [listaParaEliminar, setListaParaEliminar] = useState(null);

	const { cargando, obtenerUno, obtenerTodo, obtenerRelacionados, insertar, actualizar, eliminar } = useSupabaseCRUD();
	const {usuario, isAdmin} = useSesionContext();

	// Funciones de lectura
	const getListas = async () => {
		try {
			if (isAdmin()) {
				const lists = await obtenerTodo('listas_compra');
				setListas(lists);
			}
		} catch (error) {
			setErrorLista(error.message);
		}
	}


	const getListasPropias = async () => {
		try {
			// Desde Supabase se encarga de obtener solamente las que haya creado el usuario con sesión activa.
			const lists = await obtenerUno('listas_compra', usuario.id, 'id_propietario');
			setListas(lists);
		} catch (error) {
			setErrorLista(error.message);
		}
	}

	const getLista = async (idLista) => {
		try {
			const list = await obtenerUno('listas_compra', idLista);
			setListaActual(list[0]);
		} catch (error) {
			setErrorLista(error.message);
		}
	}
	// Consulta multitabla para recuperar los productos de una lista en concreto.
	// Indicamos que recupere todos los campos de 'columnas' que pertenezan a la lista con el uid que recibe la función.
	const getProductosEnLista = async (idLista) => {
		const columnas = 'id, cantidad, comprado, producto:producto_id(id, nombre, precio, peso)';
		try {
			const resultado = await obtenerRelacionados('items_lista', 'lista_id', idLista, columnas);
			setItems(resultado);
		} catch (error) {
			setErrorLista(error.message);
			setItems([itemsIniciales]);
		}
	}

	// Funciones de escritura, devuelven true o false por influencia de Miguel Ángel que lo hace así en su asignatura y resulta bastante útil.
	// Para crear una lista solo necesitamos el nombre, del resto ya se encarga Supabase (no necesitamos pasarle el id del usuario).
	const createLista = async () => {
		try {
			if (!listaActual.nombre || listaActual.nombre.trim() === '') {
				throw new Error('El nombre de la lista es obligatorio.');
			}
			await insertar('listas_compra', listaActual);
			manejarExito('crear');
			limpiarDatosLista(); // Limpiar el formulario después de crear la lista.
			await getListasPropias(); // Actualizar el listado
			return true;
		} catch (error) {
			manejarFallo(error);
			return false;
		}
	}

	// Borrar lista, en Supabase está configurado para que, si se borra una lista, los productos asociados se eliminen en cascada.
	const rmLista = async (idLista) => {
		try {
			await eliminar('listas_compra', idLista);
			manejarExito('eliminar');
			await getListasPropias(); // Recargo las listas tras eliminar una porque no he configurado una suscripción a la tabla 'listas_compra'.
			return true;
		} catch (error) {
			manejarFallo(error);
			return false;
		}
	}

	const addProducto = async (productoId, cantidad = 1) => {
		try {
			// Verificar si el producto ya está en la lista utilizando el estado 'items'.
			const itemExistente = items.find(item => item.producto.id === productoId);

			if (itemExistente) {
				// Si existe, actualizar la cantidad en la base de datos.
				await updateCantidadProducto(itemExistente.id, itemExistente.cantidad + cantidad);
			} else {
				// Si no existe, crear nuevo ítem.
				const nuevoItem = {
					lista_id: listaActual.id,
					producto_id: productoId,
					cantidad: cantidad,
					comprado: false
				};
				await insertar('items_lista', nuevoItem);
			}
			// Recarga manual de los productos en la lista.
			await getProductosEnLista(listaActual.id);
			manejarExito('addProducto');
			return true;
		} catch (error) {
			manejarFallo(error);
			return false;
		}
	}
	// Quitar un producto de la lista y actualizar el listado.
	const rmProducto = async (itemId) => {
		try {
			await eliminar('items_lista', itemId);
			await getProductosEnLista(listaActual.id);
			manejarExito('removeProducto');
			return true;
		} catch (error) {
			manejarFallo(error);
			return false;
		}
	}
	// Al actualizar una cantidad, si la cantidad es 0, se elimina el producto de la lista.
	// Para todo lo demás, actualizamos la cantidad.
	const updateCantidadProducto = async (itemId, nuevaCantidad) => {
		try {
			if (nuevaCantidad <= 0) {
				await rmProducto(itemId);
				return true;
			}
			await actualizar('items_lista', itemId, { cantidad: nuevaCantidad });
			await getProductosEnLista(listaActual.id);
			return true;
		} catch (error) {
			manejarFallo(error);
			return false;
		}
	}

	// Tenía el campo creado en la base de datos así que lo vamos a usar, es un booleano para indicar si ya hemos comprado el producto.
	// Si el producto ya está comprado, lo marcamos como no comprado y viceversa. Después recargamos la lista para mostrar el cambio.
	const toggleComprado = async (itemId, estadoActual) => {
		try {
			await actualizar('items_lista', itemId, { comprado: !estadoActual });
			await getProductosEnLista(listaActual.id);
			return true;
		} catch (error) {
			manejarFallo(error);
			return false;
		}
	}

	// Funciones de manejo de datos
	const manejarDatosLista = (e) => {
		const { name, value } = e.target;
		setListaActual({
			...listaActual,
			[name]: value
		});
	};

	const limpiarDatosLista = () => {
		setListaActual(listaInicial);
	};

	// Le pasamos el id de la lista y recupera la información de la lista junto con los productos que contiene.
	// La utilizo cuando hacemos clic en el botón de detalles en ListadoListas, así carga la página de gestión con la información actualizada.
	const cargarListaParaMostrar = async (idLista) => {
		try {
			await getLista(idLista);
			await getProductosEnLista(idLista);
		} catch (error) {
			setErrorLista(error.message);
		}
	};

	// Funciones de modal
	const abrirModalEliminacion = (listaId) => {
		setListaParaEliminar(listaId);
		setModalOpen(true);
	};

	const cerrarModalEliminacion = () => {
		setListaParaEliminar(null);
		setModalOpen(false);
	};

	const confirmarEliminacion = async () => {
		await rmLista(listaParaEliminar);
		cerrarModalEliminacion();

	};

	// Funciones de avisos
	// Acciones comunes para cuando algo sale bien.
	const manejarExito = (accion) => {
		const mensajes = {
			crear: 'Lista creada correctamente.',
			eliminar: 'Lista eliminada correctamente.',
			addProducto: 'Producto añadido a la lista.',
			removeProducto: 'Producto eliminado de la lista.'
		};
		setMensajeExito(mensajes[accion]);
		setTimeout(() => setMensajeExito(''), 2000);
		setErrorLista('');
	};
	// Acción común para cuando algo sale mal.
	const manejarFallo = (error) => {
		setErrorLista(error.message);
		setTimeout(() => setErrorLista(''), 3000);
	};

	// Cálculos de resumen
	// Con reduce guardamos el total acumulado y lo vamos sumando con el precio o peso de cada producto, multiplicado por su cantidad.
	const calcularPesoTotal = () => {
		return items.reduce((total, item) => {
			return total + item.producto?.peso * item.cantidad;
		}, 0); // Valor inicial del acumulador.
	};

	const calcularPrecioTotal = () => {
		return items.reduce((total, item) => {
			return total + item.producto?.precio * item.cantidad;
		}, 0);
	};
	// Si nos pasamos del peso determinado, devolvemos true y necesitamos el coche. Si no, false y podemos ir andando.
	const necesitaCoche = () => {
		const UMBRAL_PESO = 4;
		return calcularPesoTotal() > UMBRAL_PESO;
	};

	// Cargar listas al montar el componente.
	// Esta vez no he hecho la suscripción a la tabla porque no hay una acción que repita siempre tras un cambio como ocurre con el listado de productos.
	// Tendría que hacer una suscripción distinta según la acción y no parece que merezca la pena, mejor ejecuto la función que necesite en cada caso.
	useEffect(() => {
		getListasPropias();
	}, []);


	const exportaciones = {
		getListas, 
		getListasPropias,
		getLista,
		getProductosEnLista,
		cargarListaParaMostrar,
		createLista,
		rmLista,
		addProducto,
		rmProducto,
		updateCantidadProducto,
		toggleComprado,
		manejarDatosLista,
		limpiarDatosLista,
		abrirModalEliminacion,
		cerrarModalEliminacion,
		confirmarEliminacion,
		calcularPesoTotal,
		calcularPrecioTotal,
		necesitaCoche,
		listas,
		listaActual,
		items,
		errorLista,
		cargando,
		mensajeExito,
		modalOpen
	}

	return (
		<>
			<ContextoListas.Provider value={exportaciones}>
				{children}
			</ContextoListas.Provider>
		</>
	)
}

export default ProveedorListas
export { ContextoListas }