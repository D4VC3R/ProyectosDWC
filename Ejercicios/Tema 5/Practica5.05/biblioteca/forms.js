"use strict";

// -------------------------------
// Parte II                       |
// -------------------------------

const validarTitulo = (nameForm, nameCampo) => {
	const titulo = document.forms[nameForm][nameCampo].value;
	const expTitulo = /^.{5,}$/;
	return expTitulo.test(titulo);
}

const validarInterprete = (nameForm, nameCampo) => {
	const interprete = document.forms[nameForm][nameCampo].value;
	const expInterprete = /^.{5,}$/;
	return expInterprete.test(interprete);
}

const validarAnyo = (nameForm, nameCampo) => {
	const anyo = document.forms[nameForm][nameCampo].value;
	const expAnyo = /[0-9]{4}/;
	return expAnyo.test(anyo);
}

const validarGenero = (idSelect) => {
	return idSelect.selectedIndex > 0;
}

const validarLocalizacion = (nameForm, nameCampo) => {
	const localizacion = document.forms[nameForm][nameCampo].value;
	const expLocalizacion = /^ES-\d{3}[A-Z]{2}$/;
	return expLocalizacion.test(localizacion);
}

export const validarForm = (nameForm) => {
	const formulario = document.forms[nameForm];

	return validarTitulo(formulario, formulario.titulo) &&
	validarInterprete(formulario, formulario.interprete) &&
	validarAnyo(formulario, formulario.anyo) &&
	validarGenero(formulario, formulario.genero)
}