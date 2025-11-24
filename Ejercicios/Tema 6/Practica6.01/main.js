"use strict";

import { plantilla } from "./biblioteca/promesas.js";


window.onload = () => {

	// Ejercicio 1

	const promesa = new Promise((resolver, rechazar) =>{
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
	})

	// Ejercicio 2
}