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
		// No devuelvo el error porque en caso de haberlo, lo guardaría en la promesa (peliculasSW en el main).
		// Si se produce un error, lo capturo en el try catch del main.
	);
};