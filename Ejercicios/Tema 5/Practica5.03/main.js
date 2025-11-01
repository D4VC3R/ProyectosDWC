"use strict";
import { crearLista, setColores, crearTabla, alternarBotonActivo, getInfoColor } from "./biblioteca/paint.js";

window.onload = () => {

	// Con cambiar el primer parámetro puedes tener tantos colores como quieras.
	const listaColores = crearLista(11, "lista-colores");

	setColores(listaColores);
	// Como hemos hecho que crear tabla reciba parámetros, podemos hacernos un lienzo al gusto.
	crearTabla(60, 60, "tabla-lienzo");

	const panelColores = document.getElementById("contenedor-colores");
	const colores = Array.from(document.getElementsByTagName("li"));
	const celdas = Array.from(document.getElementsByTagName("td"))
	const lienzo = document.getElementById("contenedor-lienzo");
	
	// estilo contendrá el valor del atributo <style>, que será siempre background-color, y lo aplicará a cada casilla por la que pasemos el ratón.
	let estilo = "";
	// Como lo he hecho con mouseover, para controlar si estoy pintando o no, necesito un booleano.
	let pintando = false;

	// Si se clica en un color, capturamos su atributo style y lo guardamos en 'estilo' para aplicarlo más adelante.
	panelColores.addEventListener("click", (evento) =>{
		let click = evento.target;

		if (colores.includes(click)){
			estilo = click.getAttribute("style");
			alternarBotonActivo(colores, click);
			getInfoColor(estilo, "color-seleccionado");
		} 
	}, false);

	// Si hacemos clic en el contenedor lienzo, comprobamos en qué parte del div se ha hecho clic y actuamos como corresponda.
	lienzo.addEventListener("click", (evento) =>{
		let click = evento.target;

		if (click === document.getElementById("boton-borrar")) celdas.forEach(celda => celda.setAttribute("style", "background-color: #FFFFFF"));
		if (click === document.getElementById("boton-preciso")) celdas.forEach(celda => celda.classList.toggle("preciso"));
		if (click.tagName === ("TD")) pintando = !pintando;
	}, false);

	// Cuando el ratón se mueve, si el booleano está en true, pintamos en las celdas.
	lienzo.addEventListener("mouseover", (evento) =>{
		let click = evento.target;
		if (celdas.includes(click) && pintando === true) click.setAttribute("style", estilo);
	}, false);


} // Fin window.onload