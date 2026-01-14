import React from 'react'
import { useState, createContext, useEffect } from 'react';
import useAPI from '../hooks/useAPI';

const ContextoDiscos = createContext();

const ProveedorDiscos = ({ children }) => {
	const [discos, setDiscos] = useState([]);
	const URL = "http://localhost:3000/coleccion";

	const { getDatos, getDato, guardarDatos, editarDatos, modificarDato, borrarDatos, cargando } = useAPI();

	const getDiscos = async () => {
		try {
			const datos = await getDatos(URL);
			setDiscos(datos);
		} catch (error) {
			throw error
		}
	}

	const getDisco = async (id) => {
		const disco = discos.find(disco => disco.id === id);
		if (!disco) {		
			try {
				disco = await getDato(URL, id);
				return disco;
			} catch (error) {
				throw error;
			}
		}
		return disco;
	}

	const guardarDisco = async (disco) => {
		try {
			await guardarDatos(URL, disco);
			getDiscos();
		} catch (error) {
			throw error
		}
	}

	const editarDisco = async (disco, id) => {
		try {
			await editarDatos(`${URL}/${id}`, disco);
			getDiscos();
		} catch (error) {
			throw error
		}
	}

	const editarCampo = async (disco, id) => {
		try {
			await modificarDato(`${URL}/${id}`, disco);
			getDiscos();
		} catch (error) {
			throw error
		}
	}

	const borrarDisco = async (id) => {
		try {
			await borrarDatos(`${URL}/${id}`);
			getDiscos();
		} catch (error) {
			throw error
		}
	}

	const exportaciones = {
		discos,
		cargando,
		getDiscos,
		getDisco,
		guardarDisco,
		editarDisco,
		editarCampo,
		borrarDisco
	}

	useEffect(() => {
		getDiscos();
	}, [])

	return (
		<>
			<ContextoDiscos.Provider value={exportaciones}>
				{children}
			</ContextoDiscos.Provider>
		</>
	)
}

export default ProveedorDiscos;
export { ContextoDiscos };