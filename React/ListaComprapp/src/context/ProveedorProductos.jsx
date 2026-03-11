import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'
import useSupabaseCRUD from '../hooks/useSupabaseCRUD.js';
import { useEffect } from 'react';

const ContextoProductos = createContext();

const ProveedorProductos = ({ children }) => {


	// Valores iniciales
	const productosIniciales = [];
	const errorProductoInicial = "";
	const productoInicial = {
		nombre: '',
		descripcion: '',
		precio: '',
		peso: '',
		imagen: ''
	};

	// Estados
	// Estado para el listado de productos completo o filtrado.
	const [listadoProductos, setListadoProductos] = useState(productosIniciales);
	// Estado para recuperar un solo producto sin perder el listado completo. Útil para eliminar, editar y manejar los datos del formulario.
	const [producto, setProducto] = useState(productoInicial);
	// Estados para manejar errores o éxitos relacionados con productos.
	const [errorProducto, setErrorProducto] = useState(errorProductoInicial);
	const [mensajeExito, setMensajeExito] = useState('');
	// Estado para saber si cargamos el formulario con datos para edición o en blanco para creación.
	const [modoEdicion, setModoEdicion] = useState(false);
	// Estado para manejar el modal de confirmación de borrado.
	const [modalOpen, setModalOpen] = useState(false);

	//Hooks
	const { cargando, obtenerTodo, obtenerUno, filtrarILike, filtrarIgualOMenor, ordenarTabla, insertar, actualizar, eliminar, suscripcionATabla, cancelarSuscripcion } = useSupabaseCRUD();

	//Funciones de lectura
	// Traer todos los productos.
	const getAllProducts = async () => {
		try {
			const productos = await obtenerTodo('producto');
			setListadoProductos(productos)
		} catch (error) {
			setErrorProducto(error.message)
		}
	};

	// Obtener un solo producto, como devuelve un array aún así, hay que especificar la primera posición.
	const getProduct = async (uuid) => {
		try {
			const producto = await obtenerUno('producto', uuid);
			setProducto(producto[0]);
		} catch (error) {
			setErrorProducto(error.message);
		}
	};

	// Por practicar y cambiar un poco, lo he hecho todo llamando a la base de datos, pero me gusta más filtrar el listado completo desde el estado.
	const getSameValue = async (columna, valor) => {
		try {
			const filtrados = await filtrarILike('producto', columna, valor);
			setListadoProductos(filtrados);
		} catch (error) {
			setErrorProducto(error.message);
		}
	};

	const getLessOrEqual = async (columna, valor) => {
		try {
			const filtrados = await filtrarIgualOMenor('producto', columna, valor);
			setListadoProductos(filtrados);
		} catch (error) {
			setErrorProducto(error.message)
		}
	};

	const sortProducts = async (columna, orden) => {
		try {
			const ordenados = await ordenarTabla('producto', columna, orden);
			setListadoProductos(ordenados);
		} catch (error) {
			setErrorProducto(error)
		}
	};

	// Funciones de manejo de datos de producto.
	const manejarDatosProducto = (e) => {
		const { name, value } = e.target;
		setProducto({
			...producto,
			[name]: value
		});
	};

	const limpiarDatosProducto = () => {
		setProducto(productoInicial);
		setModoEdicion(false); 
	};

	// Recupera un producto a partir del id y pone el formulario en modo edición.
	const cargarProductoParaEditar = async (id) => {
		try {
			await getProduct(id);
			setModoEdicion(true);
		} catch (error) {
			setErrorProducto(error.message);
		}
	};

	// Las validaciones chichinabescas ahora se hacen aquí en lugar de en el componente CrearProducto.
	const validarDatosProducto = () => {
		if (!producto.nombre.trim() || producto.nombre.length < 3) {
			throw new Error('El nombre del producto es obligatorio y debe contener al menos tres caracteres.');
		}
		if (!producto.precio || isNaN(producto.precio) || parseFloat(producto.precio) <= 0) {
			throw new Error('El precio debe ser un número positivo.');
		}
		if (!producto.peso || isNaN(producto.peso) || parseFloat(producto.peso) <= 0) {
			throw new Error('El peso debe ser un número positivo.');
		}
	};

	// Para quitar espacios en blanco y convertir a decimal antes de enviar a la base de datos (Solo en los campos obligatorios).
	const formatearProducto = () => {
		return {
			nombre: producto.nombre.trim(),
			descripcion: producto.descripcion || '',
			precio: parseFloat(producto.precio),
			peso: parseFloat(producto.peso),
			imagen: producto.imagen || ''
		};
	};

	// Para no repetir código, según la acción se muestra un mensaje u otro.
	const manejarExito = (accion) => {
		const mensajes = {
			crear: 'Producto creado correctamente.',
			actualizar: 'Producto actualizado correctamente, serás redirigido en breve.',
			eliminar: 'Producto eliminado correctamente.'
		};

		setMensajeExito(mensajes[accion]);
		setTimeout(() => setMensajeExito(''), 2000);
		setErrorProducto(''); // Limpiar cualquier error que se haya podido producir antes del éxito.

		(accion === 'crear' || accion === 'actualizar') && limpiarDatosProducto(); // Estas dos acciones repiten lógica, así que las agrupo.
		accion === 'eliminar' && cerrarModalEliminacion();
	}

	// No siempre va a ser éxito, a veces hay que lidiar con el fracaso...
	const manejarFallo = (error) => {
		setErrorProducto(error.message);
		setTimeout(() => setErrorProducto(''), 2000);
	}

	// Funciones de escritura (crear, actualizar, borrar).
	// En lugar de pasarles parámetros, usan el estado 'producto'.

	// Validar -> formatear -> insertar -> mensaje éxito -> limpiar formulario.
	const createProduct = async () => {
		try {
			// Si falla validar producto, saltará a la excepción y no se ejecutará el resto.
			validarDatosProducto();
			const productoFormateado = formatearProducto();
			await insertar('producto', productoFormateado);
			manejarExito('crear');
			return true;
		} catch (error) {
			manejarFallo(error);
			return false;
		}
	}

	// Cogemos el estado producto, lo validamos, formateamos, guardamos en la base de datos y nos traemos el listado actualizado.
	const updateProduct = async () => {
		try {
			validarDatosProducto();
			const productoFormateado = formatearProducto(producto);
			await actualizar('producto', 'id', producto.id, productoFormateado);
			manejarExito('actualizar');
			return true; // Devuelvo true para poder navegar tras la creación si todo ha ido bien.
		} catch (error) {
			manejarFallo(error);
			return false;
		}
	}

	const confirmarEliminacion = async () => {
		try {
			// Como solo guardamos el id del producto a eliminar, lo pasamos directamente en lugar de producto.id.
			await eliminar('producto', producto);
			manejarExito('eliminar');
			return true; // Por si en el futuro quiero hacer algo tras eliminar.
		} catch (error) {
			manejarFallo(error);
			cerrarModalEliminacion();
		}
	};


	// Funciones de manejo de modal de eliminación.
	// Al abrir el modal, guardamos solo el id del producto a eliminar e indicamos que el modal está abierto.
	const abrirModalEliminacion = (id) => {
		setProducto(id);
		setModalOpen(true);
	};
	// Al cerrarlo, ya sea por cancelar o tras eliminar, limpiamos el id del producto y ponemos el modal como cerrado.
	const cerrarModalEliminacion = () => {
		setModalOpen(false);
		setProducto(null);
	};

	const getSuscripcion = () => {
		// Necesitamos el return para poder eliminar la suscripción cuando desmontemos el componente, si no, se crearía una suscripcion cada vez que entramos y salimos del contexto.
		return suscripcionATabla('producto',  () => {
			getAllProducts(); // La acción a ejecutar cuando se produce un cambio en la tabla productos.
		});
	};


	// Efectos
	useEffect(() => {
		// Carga inicial de datos
		getAllProducts();
		// Suscripción a cambios en la tabla productos
		const canal = getSuscripcion();

		// Al desmontar el componente, eliminamos la suscripción para evitar problemas.
		return () => {
			cancelarSuscripcion(canal);
		};
	}, []); // No hacen falta dependencias porque getSuscripcion ya actualiza el listado cuando hay cambios.

	const exportaciones = {
		getAllProducts,
		getProduct,
		getSameValue,
		getLessOrEqual,
		sortProducts,
		createProduct,
		updateProduct,
		manejarDatosProducto,
		limpiarDatosProducto,
		cargarProductoParaEditar,
		abrirModalEliminacion,
		cerrarModalEliminacion,
		confirmarEliminacion,
		producto,
		listadoProductos,
		errorProducto,
		mensajeExito,
		modalOpen,
		modoEdicion,
		cargando
	}

	return (
		<>
			<ContextoProductos.Provider value={exportaciones}>
				{children}
			</ContextoProductos.Provider>
		</>
	)
}

export default ProveedorProductos;
export { ContextoProductos };