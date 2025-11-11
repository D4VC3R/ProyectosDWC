"use strict";

// -------------------------------
// Parte II                       |
// -------------------------------

const validarTitulo = (nameFormulario, nameTitulo) => {
	const titulo = document.forms[nameFormulario][nameTitulo].value;
	const expTitulo = /^.{5,}$/;
	return expTitulo.test(titulo);
}

const validarInterprete = (nameFormulario, nameInterprete) => {
	const interprete = document.forms[nameFormulario][nameInterprete].value;
	const expInterprete = /^.{5,}$/;
	return expInterprete.test(interprete);
}

const validarAnyo = (nameFormulario, nameAnyo) => {
	const anyo = document.forms[nameFormulario][nameAnyo].value;
	const expAnyo = /[0-9]{4}/;
	return expAnyo.test(anyo);
}

const validarGenero = (nameFormulario, idSelect) => {
	
}