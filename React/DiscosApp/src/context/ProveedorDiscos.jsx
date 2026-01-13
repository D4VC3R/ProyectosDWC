import React from 'react'
import { useState, createContext, useEffect } from 'react';
import useAPI from '../hooks/useAPI';

const ContextoDiscos = createContext();

const ProveedorDiscos = ({ children }) => {
	const [discos, setDiscos] = useState([]);
	const URL = "http://localhost:3000/coleccion";

	const { getDatos, guardarDatos, editarDatos, modificarDato, borrarDatos, cargando } = useAPI();

	const getDiscos = async () => {
		try {
			const datos = await getDatos(URL);
			setDiscos(datos);
		} catch (error) {
			throw error
		}
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