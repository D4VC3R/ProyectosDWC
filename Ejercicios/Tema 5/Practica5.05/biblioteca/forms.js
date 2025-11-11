"use strict";

// -------------------------------
// Parte II                       |
// -------------------------------

const validarTitulo = (nameForm, nameCampo) => {
	const titulo = document.forms[nameForm][nameCampo].value;
	const expTitulo = /^.{5,}$/;
	let valido = expTitulo.test(titulo);
	marcarCampo(nameCampo, valido);
	return valido;
}

const validarInterprete = (nameForm, nameCampo) => {
	const interprete = document.forms[nameForm][nameCampo].value;
	const expInterprete = /^.{5,}$/;
	let valido = expInterprete.test(interprete);
	marcarCampo(nameCampo, valido);
	return valido;
}

const validarAnyo = (nameForm, nameCampo) => {
	const anyo = document.forms[nameForm][nameCampo].value;
	const expAnyo = /[0-9]{4}/;
	let valido = expAnyo.test(anyo);
	marcarCampo(nameCampo, valido);
	return valido;
}

const validarGenero = (nameForm, nameCampo) => {
	const select = document.forms[nameForm][nameCampo];
	let valido = select.value !== "";
	marcarCampo(nameCampo, valido);
	return valido;
}

const validarLocalizacion = (nameForm, nameCampo) => {
	const localizacion = document.forms[nameForm][nameCampo].value;
	const expLocalizacion = /^ES-\d{3}[A-Z]{2}$/;
	let valido = expLocalizacion.test(localizacion);
	marcarCampo(nameCampo, valido);
	return valido;
}

export const comprobarForm = (nameForm) => {

	return validarTitulo(nameForm, "titulo") &&
	validarInterprete(nameForm, "interprete") &&
	validarAnyo(nameForm, "anyo") &&
	validarGenero(nameForm, "genero") && 
	validarLocalizacion(nameForm, "localizacion")
}

const marcarCampo = (valido, campo) => {
	if (valido && campo.classList.contains("campo-invalido")) {
		campo.classList.remove("campo-invalido");
	}else if (!valido) {
		campo.classList.add("campo-invalido");
	}
}
