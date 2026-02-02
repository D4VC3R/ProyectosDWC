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
	const productoInicial = {};
	const datosProductoInicial = {
		nombre: '',
		descripcion: '',
		precio: '',
		peso: '',
		imagen: ''
	};

	// Estados
	const [listadoProductos, setListadoProductos] = useState(productosIniciales);
	const [producto, setProducto] = useState(productoInicial);
	const [errorProducto, setErrorProducto] = useState(errorProductoInicial);
	const [datosProducto, setDatosProducto] = useState(datosProductoInicial);
	const [modalOpen, setModalOpen] = useState(false);
	const [productoAEliminar, setProductoAEliminar] = useState(null);
	const [mensajeExito, setMensajeExito] = useState('');
	const [modoEdicion, setModoEdicion] = useState(false);

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
			setProducto(producto);
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
		setDatosProducto({
			...datosProducto,
			[name]: value
		});
	};

	const limpiarDatosProducto = () => {
		setDatosProducto(datosProductoInicial);
		setModoEdicion(false);
	};

	// Como devuelve los datos en forma de array, hay que especificar el primer elemento.
	const cargarProductoParaEditar = async (id) => {
		try {
			const productoAEditar = await obtenerUno('producto', id);
			setDatosProducto({
				nombre: productoAEditar[0].nombre || '',
				descripcion: productoAEditar[0].descripcion || '',
				precio: productoAEditar[0].precio || '',
				peso: productoAEditar[0].peso || '',
				imagen: productoAEditar[0].imagen || ''
			});
			setModoEdicion(true);
		} catch (error) {
			setErrorProducto(error.message);
		}
	};

	const validarDatosProducto = () => {
		if (!datosProducto.nombre.trim()) {
			throw new Error('El nombre del producto es obligatorio');
		}
		if (!datosProducto.precio || isNaN(datosProducto.precio) || parseFloat(datosProducto.precio) <= 0) {
			throw new Error('El precio debe ser un número positivo');
		}
		if (!datosProducto.peso || isNaN(datosProducto.peso) || parseFloat(datosProducto.peso) <= 0) {
			throw new Error('El peso debe ser un número positivo');
		}
	};

	const formatearProducto = (datos) => {
		return {
			nombre: datos.nombre.trim(),
			descripcion: datos.descripcion.trim(),
			precio: parseFloat(datos.precio),
			peso: parseFloat(datos.peso),
			imagen: datos.imagen.trim() || null
		};
	};

	// Funciones de escritura (crear, actualizar, borrar).
	const createProduct = async () => {
		try {
			// Si falla validar producto, saltará la excepción y no se ejecutará el resto.
			validarDatosProducto();
			const productoFormateado = formatearProducto(datosProducto);
			await insertar('producto', productoFormateado);
			setMensajeExito('Producto creado correctamente');
			setErrorProducto('');
			setTimeout(() => setMensajeExito(''), 3000);
			limpiarDatosProducto();
		} catch (error) {
			setErrorProducto(error.message);
			setMensajeExito('');
			throw error;
		}
	}

	const updateProduct = async (id, datosProducto) => {
		try {
			await actualizar('producto', id, datosProducto);
			setMensajeExito('Producto actualizado correctamente');
			setErrorProducto('');
			setTimeout(() => setMensajeExito(''), 3000);
			limpiarDatosProducto();
		} catch (error) {
			setErrorProducto(error.message);
			throw error;
		}
	}

	const deleteProduct = async (id) => {
		try {
			await eliminar('producto', id);
		} catch (error) {
			setErrorProducto(error.message);
			throw error;
		}
	}

	// Funciones de manejo de modal de eliminación
	const abrirModalEliminacion = (id) => {
		setProductoAEliminar(id);
		setModalOpen(true);
	};

	const cerrarModalEliminacion = () => {
		setModalOpen(false);
		setProductoAEliminar(null);
	};

	const confirmarEliminacion = async () => {
		if (productoAEliminar) {
			try {
				await eliminar('producto', productoAEliminar);
				await getAllProducts();
				setMensajeExito('Producto eliminado correctamente');
				setErrorProducto('');
				setTimeout(() => setMensajeExito(''), 3000);
				cerrarModalEliminacion();
			} catch (error) {
				setErrorProducto(error.message);
				setMensajeExito('');
				cerrarModalEliminacion();
			}
		}
	};

	// Efectos
	useEffect(() => {
		// Al montar el componente, cargamos el listado de productos.
		getAllProducts();
	}, []);

	// En principio lo exporto todo, luego ya veré que necesito utilizar.
	const exportaciones = {
		getAllProducts,
		getProduct,
		getSameValue,
		getLessOrEqual,
		sortProducts,
		createProduct,
		updateProduct,
		deleteProduct,
		manejarDatosProducto,
		limpiarDatosProducto,
		cargarProductoParaEditar,
		abrirModalEliminacion,
		cerrarModalEliminacion,
		confirmarEliminacion,
		producto,
		datosProducto,
		listadoProductos,
		errorProducto,
		mensajeExito,
		modalOpen,
		productoAEliminar,
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