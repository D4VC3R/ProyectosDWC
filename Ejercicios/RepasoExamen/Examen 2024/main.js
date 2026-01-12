"use strict";


import { cargarTabla, validarForm, comprobarCampo } from "./dom.js";

window.onload = () => {
	/** @type {HTMLFormElement} */
	const form = document.forms["examForm"];
	
	cargarTabla();

	form.addEventListener("click", ((e)=>{
		e.preventDefault();
		e.target.tagName === "BUTTON" && validarForm(form);
	}),false);

	form.addEventListener("input", ((e)=>{
		comprobarCampo(e.target);
	}));


}; // Fin del window.onload
