"use strict";

export const traerDatos = (url) => {
	// En el futuro haré lo que dijiste de si viene de una api me devuelves datos y si viene de otra, datos.results.
	return (
		fetch(url)
		.then((respuesta) =>{
			return respuesta.json();
		})
		.then((datos)=>{
			return datos;
		}).catch((error) =>{
			return error.message;
		})
	);
};