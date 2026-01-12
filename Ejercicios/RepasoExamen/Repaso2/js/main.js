"use strict";

import { borrarDisco, buscarDiscos, cargarDiscos,  manejarExito, mostrarDiscos, mostrarErrores } from "./libraries/dom.js";
import { limpiarListado } from "./libraries/utilidades.js";
import {comprobarCampo, comprobarForm} from './libraries/validaciones.js';

/**
 * Validaciones: Recibe el campo, devuelve booleando
 * ValidarForm: Todas las validaciones a la vez, devuelve errores.
 * MostrarErrores: Recibe array de errores y rellena un <ul>
 * LimpiarErrores: ul.innerHtml = ""; Timeout¿?
 * CrearDisco: Recibe form validado y crea un disco.
 * GuardarDisco: Recibe form validado y la coleccion, guarda en lS y devuelve la coleccion actualizada.
 */
window.onload = () => {

	let coleccion = cargarDiscos() || [];
	const form = document.forms.namedItem("formDiscos");
	const divDiscos = document.getElementById("contenedorDiscos");

	form.addEventListener("click", ((e)=>{
		e.target.type !== "checkbox" && e.preventDefault();
		e.target.textContent.toLowerCase() === "mostrar" &&	mostrarDiscos(coleccion);
		e.target.textContent.toLowerCase() === "limpiar" && limpiarListado();
		
		if(e.target.textContent.toLowerCase() === "guardar") {
			comprobarForm(form, coleccion) ? coleccion = manejarExito(form, coleccion)	: mostrarErrores(form);
		}
		
		}
	), false);


	form.addEventListener("input", ((e)=>{
		e.target.id === "busqueda" &&  buscarDiscos(e.target.value, coleccion);
		e.target.id === "busqueda" && e.target.value === "" && limpiarListado();
		comprobarCampo(e.target);
		}
	), false);

	divDiscos.addEventListener("click", ((e)=>{
		if(e.target.textContent === "X"){
			coleccion = borrarDisco(e.target.id, coleccion);
			mostrarDiscos(coleccion)
		}
	}),false);

	console.log(coleccion);





}// Fin window.onload