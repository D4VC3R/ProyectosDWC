"use strict";

import { ordenar, plantilla, plantillaSW } from "./biblioteca/promesas.js";


window.onload = () => {

	// Ejercicio 1

/* 	const promesa = new Promise((resolver, rechazar) =>{
		setTimeout(() => {
			const num = Math.floor(Math.random()*101);
			num % 2 === 0
			? resolver(num)
			: rechazar(new Error("El número es impar."))
		}, 2000);
	});

	promesa.then((datos) =>{
		console.log(datos)
	})
	.catch((error)=>{
		console.log(error.message)
	})
	.finally(()=>{
		console.log("Proceso finalizado.")
	}) */

	// Ejercicio 2

/* 	const fichero = './feos.json';
	const fichro = "";
	const div = document.getElementById("feos");
	let haFallao;

	fetch(fichero)
	.then((respuesta)=>{
		return respuesta.json();
	})
	.then((datos)=>{
		let ordenados = ordenar(datos);
		ordenados.map((feo)=>{
			return div.innerHTML += plantilla(feo);
		});
	}).catch((error)=>{
		haFallao = error.message;
	}).finally(()=>{
		haFallao ? console.log(haFallao) : console.log("Datos cargados.");
	}) */

	// Ejercicio 3

	const swapi = "https://swapi.info/api/people";
	const gentuza = document.getElementById("gentuza");
	fetch(swapi)
	.then((respuesta)=>{
		return respuesta.json();
	})
	.then((datos)=>{
		datos.map((personaje)=>{
			return gentuza.innerHTML += plantillaSW(personaje);
		});
	})
	.catch((error)=>{
		console.log(error)
	})
	.finally(()=>{
		console.log("Datos cargados.")
	})


}