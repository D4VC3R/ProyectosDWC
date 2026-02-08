import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'
import useSupabaseAUTH from '../hooks/useSupabaseAUTH';
import useSupabaseCRUD from '../hooks/useSupabaseCRUD';

const ContextoListas = createContext();

const ProveedorListas = ({children}) => {

	// Valores iniciales
	const listasIniciales = [];
	const listaInicial = {nombre: ''}

	// Estados
	const [listas, setListas] = useState(listasIniciales);
	const [listaActual, setListaActual] = useState(listaInicial);
	const [errorLista, setErrorLista] = useState('');

	const {usuario} = useSupabaseAUTH();
	const {obtenerUno, obtenerTodo, insertar, actualizar, eliminar, suscripcionATabla, cancelarSuscripcion} = useSupabaseCRUD();
	
	const getListas = async () => {}
	const getLista = async () => {}
	const createLista = async () => {
		try {
			await insertar('lista_compra', listaActual.nombre)
		} catch (error) {
			setErrorLista(error);
		}
	}
	const rmLista = async () => {}
	const addProducto = async (idProd) => {}
	const rmProducto = async (idProd) => {}

		const manejarDatosLista = (e) => {
		const { name, value } = e.target;
		setProducto({
			...listaActual,
			[name]: value
		});
	};


	const exportaciones = {

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