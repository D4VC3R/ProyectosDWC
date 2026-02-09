import React from 'react'
import { useState, useEffect , createContext } from 'react';
import useSupabaseAUTH from '../hooks/useSupabaseAUTH';
import useSupabaseCRUD from '../hooks/useSupabaseCRUD';

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

	const { usuario } = useSupabaseAUTH();
	const { obtenerUno, obtenerTodo, obtenerRelacionados, insertar, actualizar, eliminar, suscripcionATabla, cancelarSuscripcion } = useSupabaseCRUD();

	const getListas = async () => {
		try {
			const lists = await obtenerTodo('listas_compra');
			setListas(lists)
		} catch (error) {
			setErrorLista(error.message);
		}
	}
	const getLista = async (idLista) => {
		try {
			const list = await obtenerUno('listas_compra', idLista);
			setListaActual(list);
		} catch (error) {
			setErrorLista(error.message);
		}
	}
	const createLista = async () => {
		try {
			await insertar('lista_compra', listaActual.nombre)
		} catch (error) {
			setErrorLista(error);
		}
	}
	const rmLista = async (idLista) => {
		try {
			await eliminar('listas_compra', idLista);
			return true;
		} catch (error) {
			setErrorLista(error.message);
		}
	}

	const addProducto = async (idProd) => {
		try {
			await insertar('items_lista', idProd)
		} catch (error) {
			setErrorLista(error.message)
		}
	}
	const rmProducto = async (idProd) => {
		try {
			await eliminar('items_lista', idProd)
		} catch (error) {
			setErrorLista(error.message)
		}
	}

	const getProductosEnLista = async () => {
		const columnas = 'id, cantidad, comprado, producto:producto_id(id, nombre, precio, peso)';
		try {
			const resultado = await obtenerRelacionados('items_lista', 'lista_id', listaActual.id, columnas);
			console.log("Items recuperados:", resultado);
			// setItems(resultado);
		} catch (error) {
			setErrorLista(error.message);
		}
	}

	const manejarDatosLista = (e) => {
		const { name, value } = e.target;
		setProducto({
			...listaActual,
			[name]: value
		});
	};

	useEffect(()=>{
		getListas();
	},[])


	const exportaciones = {
		getListas,
		getLista,
		createLista,
		rmLista,
		addProducto,
		rmProducto,
		getProductosEnLista,
		manejarDatosLista,
		listas,
		listaActual,
		errorLista
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