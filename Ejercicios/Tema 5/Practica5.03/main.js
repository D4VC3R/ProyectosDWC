"use strict";
import { crearLista, setColores, crearTabla, alternarBotonActivo } from "./biblioteca/paint.js";

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
	// Como lo he hecho con mouseover, para saber cuándo estoy pintando y cuándo no, necesito un booleano.
	let pintando = false;

	// Según el elemento que reciba el click, capturamos el estilo del color, ponemos todas las celdas en blanco o les ponemos la clase "preciso".
	panelColores.addEventListener("click", (evento) =>{
		let click = evento.target

		if (colores.includes(click)){
			estilo = click.getAttribute("style");
			alternarBotonActivo(colores, click);
		} 
		if (click === document.getElementById("boton-borrar")) celdas.forEach(celda => celda.setAttribute("style", "background-color: #FFFFFF"));
		if (click === document.getElementById("boton-preciso")) celdas.forEach(celda => celda.classList.toggle("preciso"));
		
	}, false);

	// Al hacer click, cambiamos el valor del booleano para pintar o dejar de hacerlo.
	lienzo.addEventListener("mousedown", () =>{
			pintando = !pintando;
	}, false);

	// Cuando el ratón se mueve, si el booleano está en true, pintamos en las celdas.
	lienzo.addEventListener("mouseover", (evento) =>{
		let click = evento.target;
		if (celdas.includes(click) && pintando === true) click.setAttribute("style", estilo);
	}, false);


} // Fin window.onload