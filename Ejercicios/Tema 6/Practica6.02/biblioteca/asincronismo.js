"use strict";

// ----------------------------------
// Ejercicio 1 - Enciclopedia SW     |
// ----------------------------------

export const traerDatos = (url) => {

	return (
		fetch(url)
		.then((respuesta) =>{
			if (!respuesta.ok) {
				throw new Error("Se cayó la API... otra vez.");
			}
			return respuesta.json();
		})
		.then((datos)=>{
			return datos;
		})
		.catch((error)=>{
			return error; // Preguntar si es necesario este catch o si puedo omitirlo y capturarlo en el main.
		})
	);
};