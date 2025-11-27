"use strict";

// ----------------------------------
// Ejercicio 1 - Enciclopedia SW     |
// ----------------------------------

export const traerDatos = (url) => {

	return (
		fetch(url)
		.then((respuesta) =>{
			if (!respuesta.ok) {
				throw new Error("hola");
			}
			return respuesta.json();
		})
		.then((datos)=>{
			return datos;
		})
		.catch((error)=>{
			return error;
		})
	);
};