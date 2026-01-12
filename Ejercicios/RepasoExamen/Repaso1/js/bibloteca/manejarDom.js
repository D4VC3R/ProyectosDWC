"use strict";

import { traerDatos } from "./ajax.js";
import { validarForm } from "./validaciones.js";

export const getFormulario = (formName) => {
	return document.forms[formName];
}

export const controlarClic = (target) => {
	const botones = Array.from(document.getElementsByTagName("BUTTON"));
	const form = getFormulario("form");

	switch (target) {
		case botones[0]: guardarDisco(form);
		break;
	
		default:
			break;
	}
}

const crearDisco = (form) => {
	const disco = {
		titulo: form.titulo.value,
		artista: form.artista.value,
		genero: form.genero.value,
		anyo: form.anyo.value,
		prestado: form.prestado.checked ? "Si" : "No",
		ubicacion: form.ubicacion.value
	};
	return disco;
}

export const guardarDisco = (form) => {
	if (!validarForm(form))	return false;

	const disco = crearDisco(form);
	localStorage.setItem("discos", JSON.stringify(disco));
	form.reset();
}

export const getListadoDiscos = (url) => {
	const listadoDiscos = traerDatos(url) || [];
	return listadoDiscos;
}