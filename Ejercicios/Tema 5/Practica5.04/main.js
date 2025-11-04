"use strict";
import { addPiezas, addClase, reiniciar } from "./biblioteca/puzzle.js";
import { insertarTabla } from "./biblioteca/misFunciones.js"
window.onload = () => {

addPiezas();
insertarTabla(3, 3, "tablero");

const piezas = Array.from(document.getElementsByClassName("pieza"));
const casillas = Array.from(document.getElementsByTagName("TD"));
addClase("soltable", casillas);

document.getElementById("contenedor-piezas").addEventListener("dragstart", (evento)=>{
	if (piezas.includes(evento.target) ) {
		evento.dataTransfer.setData("id", evento.target.id)
		console.log(evento.target)
	}
}, false);

document.getElementById("contenedor-piezas").addEventListener("dragover", (evento) =>{
	evento.preventDefault();
}, false);

document.getElementById("contenedor-piezas").addEventListener("drop", (evento) =>{
	evento.preventDefault();
	if (evento.target.classList.contains("piezas") || evento.target.classList.contains("pieza")) {
		document.getElementById("piezas").appendChild(
			document.getElementById(evento.dataTransfer.getData("id"))
		)
	}
}, false);


document.getElementById("contenedor-tablero").addEventListener("dragover", (evento) =>{
	evento.preventDefault();
}, false);

document.getElementById("contenedor-tablero").addEventListener("drop", (evento) =>{
	evento.preventDefault();
	if (evento.target.classList.contains("soltable")) {
		evento.target.appendChild(
			document.getElementById(evento.dataTransfer.getData("id"))
		)
	}

	if (!document.getElementById("piezas").hasChildNodes()) {
		console.log("Has ganado.")
	}
}, false);

document.getElementById("contenedor-tablero").addEventListener("dragstart", (evento) =>{
	if (piezas.includes(evento.target)) {
		evento.dataTransfer.setData("id", evento.target.id)
	}
})

document.getElementById("contenedor-reinicio").addEventListener("click", (evento) =>{
	if (evento.target.classList.contains("boton-reinicio")) {
		reiniciar(piezas);
	}
})

}