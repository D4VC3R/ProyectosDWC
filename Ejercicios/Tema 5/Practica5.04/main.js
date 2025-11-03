"use strict";
import { crearLista } from "./biblioteca/misFunciones.js";
window.onload = () => {

const getPiezas = () => {
	const piezas = ["./../imgs/fila-1-columna-1.jpg",
		"./../imgs/fila-1-columna-2.jpg",
		"./../imgs/fila-1-columna-3.jpg",
		"./../imgs/fila-2-columna-1.jpg",
		"./../imgs/fila-2-columna-2.jpg",
		"./../imgs/fila-2-columna-3.jpg",
		"./../imgs/fila-3-columna-1.jpg",
		"./../imgs/fila-3-columna-2.jpg",
		"./../imgs/fila-3-columna-3.jpg"
	]
	
	const lista = crearLista(piezas.length, "piezas");
	console.log(lista)
	
	for (let i = 0; i < piezas.length; i++) {
		const img = document.createElement("img");
		img.src = piezas[i];
		img.alt = `pieza ${i + 1}`;
		lista.children[i].appendChild(img);
	}
}



	
}