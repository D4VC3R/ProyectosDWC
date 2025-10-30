"use strict";
import { crearLista, setColores, crearTabla } from "./biblioteca/paint.js";

window.onload = () => {

	const listaColores = crearLista(20, "lista-colores");
	setColores(listaColores);

	crearTabla(60,60,"tabla-lienzo");

	const panelColores = document.getElementById("contenedor-colores");
	const colores = Array.from(document.getElementsByTagName("li"));
	const celdas = Array.from(document.getElementsByTagName("td"))


	const lienzo = document.getElementById("contenedor-lienzo");
	let estilo = "";
	let pintando = false;


	panelColores.addEventListener("click", (evento) =>{
		let click = evento.target
		if (colores.includes(click)) {
			estilo = click.getAttribute("style");
			console.log(estilo);
		}
	}, false)

	lienzo.addEventListener("mouseover", (evento) =>{

		let click = evento.target;
		if (celdas.includes(click) && pintando === true) {
			click.setAttribute("style", estilo);
		}
	})

	lienzo.addEventListener("click", (evento) =>{
		if (celdas.includes(evento.target)) {
			pintando = !pintando;
		}
	})



}