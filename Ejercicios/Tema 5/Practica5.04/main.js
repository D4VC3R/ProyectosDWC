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

	// Pasamos las imágenes y las celdas de HTMLCollection a Array para jugar con los métodos.
	const piezas = Array.from(document.getElementsByClassName("pieza"));
	const casillas = Array.from(document.getElementsByTagName("TD"));
	addClase("soltable", casillas);
	identificarCasillas(casillas);

	// Si el dragstart lo recibe una imagen, guardamos su id.
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
		// Nos aseguramos de que recibimos una imagen desde dataTransfer antes de añadir, 
		// así evitamos errores feos en la consola si ALGUIEN intenta mover una casilla vacía al contenedor de imágenes.
		const id = evento.dataTransfer.getData("idImagen");
		if (!id) return;

		document.getElementById("piezas").appendChild(document.getElementById(id));

		// Si la imagen viene del contenedor-tablero, limpiamos la clase de la celda de la que viene.
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
		// De nuevo, comprobamos que no se esté intentanto arrastrar una casilla vacía a otra casilla.
		const idImagen = evento.dataTransfer.getData("idImagen");
		if (!idImagen) return;

		// Si se arrastra una imagen a una celda, la añadimos y comprobamos si está bien colocada.
		if (evento.target.classList.contains("soltable")) {
			evento.target.appendChild(document.getElementById(idImagen));
			isCorrecta(evento.target) ? marcarCorrecta(evento.target) : marcarIncorrecta(evento.target);

			// Si la imagen no proviene de su contenedor original, limpiamos la clase de la casilla de donde proviene.
			const idCasillaAnterior = evento.dataTransfer.getData("idCasilla");
			if (idCasillaAnterior) {
				limpiarClase(document.getElementById(idCasillaAnterior));
			}
		}
		// Por último, comprobamos si era la última pieza y si están todas bien colocadas.
		if (!document.getElementById("piezas").hasChildNodes() && isResuelto(casillas)) {
			casillas.forEach(casilla => {
				limpiarClase(casilla)
				casilla.classList.add("resuelto")})
		}
	},false);

	document.getElementById("contenedor-tablero").addEventListener("dragstart", (evento) => {
		// Si movemos una imagen ya colocada, guardamos el id de la imagen y de la casilla donde estaba.
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
