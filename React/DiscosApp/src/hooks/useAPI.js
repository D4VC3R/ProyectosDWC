import React from 'react'
import { useState } from 'react';

const useAPI = () => {

	const [cargando, setCargando] = useState(false);
	const [error, setError] = useState(null);

	const solicitar = async (url, options = {}) => {
		setCargando(true);
		setError(null);

		try {
			const respuesta = await fetch(url, {
				headers: {
					"Content-Type": "application/json",
				},
				...options
			});

			if (!respuesta.ok) {
				throw new Error(`Error cargando datos de la API: ${respuesta.statusText}`);
			}

			const datos = await respuesta.json();
			return datos;
		} catch (error) {
			setError(error.message);
			throw error;
		} finally {
			setCargando(false);
		}
	}

	const getDatos = (url) => {
		return solicitar(url);
	}

	const guardarDatos = (url, body, metodo) => {
		const solicitud = {method: metodo, body: JSON.stringify(body)};
		solicitar(url, solicitud);
	}

	const borrarDatos = (url) => {
		solicitar(url, {
			method: "DELETE"
		});
	}



	return {
		cargando,
		error,
		getDatos,
		guardarDatos,
		borrarDatos
	};
};
export default useAPI;