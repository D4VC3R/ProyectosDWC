"use strict";

// ----------------------------------
// Ejercicio 1 - Enciclopedia SW     |
// ----------------------------------

export const traerDatos = async (url) => {

	return (
		fetch(url)
		.then((respuesta) =>{
			if (!respuesta.ok) {
				throw new Error("666");
			}
			return respuesta.json();
		})
		.then((datos)=>{
			return datos;
		})
		.catch((error)=>{
			return error.message;
		})
	);
};