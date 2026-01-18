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

	// Trato de obtener el disco del estado primero y si no lo encuentra, petición a la API.
	const getDisco = async (id) => {
		let disco = discos.find(d => (d.id) === (id));

		if (!disco) {		
			try {
				disco = await getDato(`${URL}/${id}`);
				return disco;
			} catch (error) {
				throw error;
			}
		}
		return disco;
	}

	const guardarDisco = async (disco) => {
		if (!disco.id) disco 	= { ...disco, id: crypto.randomUUID() };

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

	// Pensé en devolver el componente <Cargando /> aquí mientras se cargan los discos por comodidad, pero eso implicaba cosas como que el formulario no se mostrase hasta que se cargaran los discos,
	// lo cual no tiene mucho sentido, así que al final cada componente que se gestione el estado de carga como considere oportuno.
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