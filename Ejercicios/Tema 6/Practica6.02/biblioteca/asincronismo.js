"use strict";

// ----------------------------------
// Ejercicio 1 - Enciclopedia SW     |
// ----------------------------------

export const traerDatos = (url) => {

	return (
		fetch(url)
		.then((respuesta) =>{
			return respuesta.json();
		})
		.then((datos)=>{
			return datos;
		}).catch((error) =>{
			throw new Error("Se cayó la API... otra vez.");
		})
		// No devuelvo el error porque en caso de hacerlo, lo guardaría en la promesa (peliculasSW en el main).
		// Si se produce un error, lo capturo aquí y lanzo otro con un mensaje personalizado para capturarlo en el main.
	);
};