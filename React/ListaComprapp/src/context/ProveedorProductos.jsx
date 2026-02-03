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
	const { cargando, obtenerTodo, obtenerUno, filtrarILike, filtrarIgualOMenor, ordenarTabla, insertar, actualizar, eliminar } = useSupabaseCRUD();

	//Funciones de lectura
	const getAllProducts = async () => {
		try {
			const productos = await obtenerTodo('producto');
			setListadoProductos(productos)
		} catch (error) {
			setErrorProducto(error.message)
		}
	};

	const getProduct = async (uuid) => {
		try {
			const producto = await obtenerUno('producto', uuid);
			setProducto(producto[0]);
		} catch (error) {
			setErrorProducto(error.message);
		}
	};

	// Por practicar y cambiar un poco, lo he hecho llamando a la base de datos, pero me gusta más filtrar el listado completo desde el estado.
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

	// Funciones de manejo de datos de producto
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

	
	const cargarProductoParaEditar = async (id) => {
		try {
			await getProduct(id);
			setModoEdicion(true); 
		} catch (error) {
			setErrorProducto(error.message);
		}
	};

	const validarDatosProducto = () => {
		if (!producto.nombre.trim() || producto.nombre.length < 3) {
			throw new Error('El nombre del producto es obligatorio y debe contener al menos tres caracteres');
		}
		if (!producto.precio || isNaN(producto.precio) || parseFloat(producto.precio) <= 0) {
			throw new Error('El precio debe ser un número positivo');
		}
		if (!producto.peso || isNaN(producto.peso) || parseFloat(producto.peso) <= 0) {
			throw new Error('El peso debe ser un número positivo');
		}
	};

	// Para quitar espacios en blanco y convertir a decimal antes de enviar a la base de datos (Solo en los campos obligatorios)
	const formatearProducto = (producto) => {
		return {
			nombre: producto.nombre.trim(),
			descripcion: producto.descripcion || '',
			precio: parseFloat(producto.precio),
			peso: parseFloat(producto.peso),
			imagen: producto.imagen || null
		};
	};

	// Funciones de escritura (crear, actualizar, borrar).
	// En lugar de pasarles parámetros, usan el estado 'producto'.

	// Validar -> formatear -> insertar -> mensaje éxito -> limpiar formulario.
	const createProduct = async () => {
		try {
			// Si falla validar producto, saltará a la excepción y no se ejecutará el resto.
			validarDatosProducto();
			const productoFormateado = formatearProducto(producto);
			await insertar('producto', productoFormateado);
			await getAllProducts();
			setMensajeExito('Producto creado correctamente.');
			setErrorProducto('');
			setTimeout(() => setMensajeExito(''), 2000);
			limpiarDatosProducto();
			return true; // Devuelvo true para poder navegar tras la creación si todo ha ido bien.
		} catch (error) {
			setErrorProducto(error.message);
			return false;
		}
	}

	const updateProduct = async () => {
		try {
			validarDatosProducto();
			const productoFormateado = formatearProducto(producto);
			await actualizar('producto', producto.id, productoFormateado);
			await getAllProducts();
			setMensajeExito('Producto actualizado correctamente, serás redirigido en breve...');
			setErrorProducto('');
			setTimeout(() => setMensajeExito(''), 2000);
			limpiarDatosProducto();
			return true;
		} catch (error) {
			setErrorProducto(error.message);
			return false;
		}
	}

	const confirmarEliminacion = async () => {
		if (producto) {
			try {
				// Como solo guardamos el id del producto a eliminar, lo pasamos directamente en lugar de producto.id.
				await eliminar('producto', producto);
				await getAllProducts();
				setMensajeExito('Producto eliminado correctamente');
				setErrorProducto('');
				setTimeout(() => setMensajeExito(''), 3000);
				cerrarModalEliminacion();
			} catch (error) {
				setErrorProducto(error.message);
				cerrarModalEliminacion();
			}
		}
	};


	// Funciones de manejo de modal de eliminación.
	// Al abrir el modal, guardamos solo el id del producto a eliminar.
	const abrirModalEliminacion = (id) => {
		setProducto(id);
		setModalOpen(true);
	};
	// Al cerrarlo, ya sea por cancelar o tras eliminar, limpiamos el id del producto.
	const cerrarModalEliminacion = () => {
		setModalOpen(false);
		setProducto(null);
	};


	// Efectos
	useEffect(() => {
		// Al montar el componente, cargamos el listado de productos.
		getAllProducts();
	}, []);

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