"use strict";
import {
	addPiezas,
	addClase,
	reiniciar,
	identificarCasillas,
	isResuelto,
	isCorrecta,
	marcarCorrecta,
	marcarIncorrecta,
	limpiarClase,
} from "./biblioteca/puzzle.js";
import { insertarTabla } from "./biblioteca/misFunciones.js";
window.onload = () => {
	addPiezas();
	insertarTabla(3, 3, "tablero");

	const piezas = Array.from(document.getElementsByClassName("pieza"));
	const casillas = Array.from(document.getElementsByTagName("TD"));
	addClase("soltable", casillas);
	identificarCasillas(casillas);

	document.getElementById("contenedor-piezas").addEventListener("dragstart", (evento) => {
		if (piezas.includes(evento.target)) {
			evento.dataTransfer.setData("idImagen", evento.target.id);
		}
	},false);

	document.getElementById("contenedor-piezas").addEventListener("dragover", (evento) => {
		evento.preventDefault();
	},false);

	document.getElementById("contenedor-piezas").addEventListener("drop", (evento) => {
		evento.preventDefault();
		const id = evento.dataTransfer.getData("idImagen");
		if (!id) return;

		document.getElementById("piezas").appendChild(document.getElementById(id));

		const idCasillaAnterior = evento.dataTransfer.getData("idCasilla");
		if (idCasillaAnterior) {
			limpiarClase(document.getElementById(idCasillaAnterior));
		}
	},false);

	document.getElementById("contenedor-tablero").addEventListener("dragover", (evento) => {
		evento.preventDefault();
	},false);

	document.getElementById("contenedor-tablero").addEventListener("drop", (evento) => {
		evento.preventDefault();
		const idImagen = evento.dataTransfer.getData("idImagen");
		if (!idImagen) return;

		const idCasillaAnterior = evento.dataTransfer.getData("idCasilla");
		if (evento.target.classList.contains("soltable")) {
			evento.target.appendChild(document.getElementById(idImagen));
			isCorrecta(evento.target) ? marcarCorrecta(evento.target) : marcarIncorrecta(evento.target);
			
			if (idCasillaAnterior) {
				limpiarClase(document.getElementById(idCasillaAnterior));
			}
		}

		if (!document.getElementById("piezas").hasChildNodes() && isResuelto(casillas)) {
			casillas.forEach(casilla => {
				limpiarClase(casilla)
				casilla.classList.add("resuelto")})
		}
	},false);

	document.getElementById("contenedor-tablero").addEventListener("dragstart", (evento) => {
		if (piezas.includes(evento.target)) {
			evento.dataTransfer.setData("idImagen", evento.target.id);
			evento.dataTransfer.setData("idCasilla", evento.target.parentElement.id)
		}
	},false);

	document.getElementById("contenedor-reinicio").addEventListener("click", (evento) => {
		if (evento.target.classList.contains("boton-reinicio")) 
			reiniciar(piezas, casillas);
	}, false);
};
