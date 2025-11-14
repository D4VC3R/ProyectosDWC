"use strict";

// -------------------------------
// Parte II                       |
// -------------------------------

export const getFormulario = (nameForm) => {
	return document.forms[nameForm]
}

export const validarTitulo = (form, nameCampo) => {
	const campo = form[nameCampo];
	const titulo = campo.value;
	const expTitulo = /^.{5,}$/;

	let valido = expTitulo.test(titulo);
	marcarCampo(campo, valido);
	return valido;
}

export const validarInterprete = (form, nameCampo) => {
	const campo = form[nameCampo];
	const interprete = campo.value;
	const expInterprete = /^.{5,}$/;
	let valido = expInterprete.test(interprete);
	marcarCampo(campo, valido);
	return valido;
}

export const validarAnyo = (form, nameCampo) => {
	const campo = form[nameCampo];
	const anyo = campo.value
	const expAnyo = /[0-9]{4}/;
	let valido = expAnyo.test(anyo);
	marcarCampo(campo, valido);
	return valido;
}

export const validarGenero = (form, nameCampo) => {
	const campo = form[nameCampo];
	let valido = campo.value !== "";
	marcarCampo(campo, valido);
	return valido;
}

export const validarLocalizacion = (form, nameCampo) => {
	const campo = form[nameCampo];
	const localizacion = campo.value
	const expLocalizacion = /^ES-\d{3}[A-Z]{2}$/;
	let valido = expLocalizacion.test(localizacion);
	marcarCampo(campo, valido);
	return valido;
}

export const validarUrl = (form, nameCampo) => {
	const campo = form[nameCampo];
	const url = campo.value;
	const expUrl = /^https?:\/\/.+\.(?:jpg|png)$/i;
	let valido = expUrl.test(url);
	marcarCampo(campo, valido);
	return valido;
}

export const comprobarForm = (form) => {

	return validarTitulo(form, "titulo") &&
	validarInterprete(form, "interprete") &&
	validarAnyo(form, "anyo") &&
	validarGenero(form, "genero") && 
	validarLocalizacion(form, "localizacion") &&
	validarUrl(form, "caratula");
}

const moverError = (campo) => {
	/**@type {HTMLSpanElement} */
	const error = document.forms[0].getElementsByTagName("span")[0];
	campo.parentNode.insertBefore(error, campo);
}

const mostrarError = () => {
	const error = document.forms[0].getElementsByTagName("span")[0];
	error.classList.toggle("oculto");
	error.textContent = "Revisa este campo";
}

const marcarCampo = (campo, valido) => {
	if (!valido){
		campo.classList.add("campo-invalido");
		moverError(campo);
		mostrarError();
	}
	if (valido && campo.classList.contains("campo-invalido")) {
		campo.classList.remove("campo-invalido");
	}
}
