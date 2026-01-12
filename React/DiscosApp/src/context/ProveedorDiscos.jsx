import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'
import useAPI from '../hooks/useAPI';
// Esto seria algo parecido al controlador de php

const ContextoDiscos = createContext();

const ProveedorDiscos = ({children}) => {
	const [discos, setDiscos] = useState([]);
	const URL = "http://localhost:3000/coleccion";

	const {getDatos, guardarDatos} = useAPI();
	
	const getDiscos = async () => {
		try {
			const datos = await getDatos(URL);
			setDiscos(datos);
		} catch (error) {
			// Gestionar el error
		}
	}

	const guardarDisco = async (disco, metodo) => {
		try {
			const discos = await guardarDatos(URL, disco, metodo);
			setDiscos(discos);
		} catch (error) {
			// Gestionar el error
		}
	}

	const borrarDisco = async (id) => {
		try {
			const discos = await borrarDisco(id);
			setDiscos(discos);
		} catch (error) {
			// Gestionar el error
		}
	}

	const exportaciones = {
		discos,
		getDiscos,
		guardarDisco,
		borrarDisco
	}

	return (
		<>
			<ContextoDiscos.Provider value={exportaciones}>
				{children}
			</ContextoDiscos.Provider>
		</>
	)
}

export default ProveedorDiscos;
export {ContextoDiscos};