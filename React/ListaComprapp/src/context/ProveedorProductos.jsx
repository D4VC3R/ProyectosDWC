import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'
import useSupabase from '../hooks/useSupabase';
import { useEffect } from 'react';

const ContextoProductos = createContext();

const ProveedorProductos = ({children}) => {

	

	// Valores iniciales
	const productosIniciales = [];
	const errorProductoInicial = "";
	const productoInicial = {};

	// Estados
	const [listadoProductos, setListadoProductos] = useState(productosIniciales);
	const [producto, setProducto] = useState(productoInicial);
	const [errorProducto, setErrorProducto] = useState(errorProductoInicial);

	//Hooks
	const {cargando, obtenerTodo, obtenerUno, filtrarILike, filtrarIgualOMenor, ordenarTabla} = useSupabase();

	//Funciones
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

	// Efectos
	useEffect(()=>{
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
		producto,
		listadoProductos,
		errorProducto,
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
export {ContextoProductos};