"use strict";

const validarTitulo = (titulo) => {
	const expresion = /^[a-zA-Z\s]{5,}$/;
	marcarCampo(titulo, expresion.test(titulo.value))
	return expresion.test(titulo.value);
}

const validarArtista = (artista) => {
	const expresion = /^[a-zA-Z\s]{5,}$/;
	marcarCampo(artista, expresion.test(artista.value));
	return expresion.test(artista.value);
}

const validarAnyo = (anyo) => {
	if (anyo.value === "") {
		return true;
	}
	const expresion = /^(19|20)\d{2}$/;
	marcarCampo (anyo, expresion.test(anyo.value));
	return expresion.test(anyo.value);
}

const validarGenero = (genero) => {
	marcarCampo(genero, genero.value !== "");
	return genero.value !== "";
}

const validarLocalizacion = (codigo) => {
	if (codigo.value === "") {
		return true;
	}
	const expresion = /^(ES-)\d{3}\w{2}$/;
	marcarCampo(codigo, expresion.test(codigo.value));
	return expresion.test(codigo.value);
}

export const validarCampos = (campo) => {
	switch (campo.name) {
		case "titulo": validarTitulo(campo);
		break;
		case "artista": validarArtista(campo);
		break;
		case "anyo": validarAnyo(campo);
		break;
		case "genero": validarGenero(campo);
		break;
		case "localizacion": validarLocalizacion(campo);
		default:
		break;
	}
}

export const validarForm = (form) => {

	let errores = [];

	if (!validarTitulo(form.titulo)) {
		errores = [...errores, "El título debe tener al menos 5 caracteres."];
	}
	if (!validarArtista(form.artista)) {
		errores = [...errores, "El artista debe tener al menos 5 caracteres."];
	}
	if (!validarAnyo(form.anyo)) {
		errores = [...errores, "Introduce un disco de este siglo o del anterior."];
	}
	if (!validarGenero(form.genero)) {
		errores = [...errores, "Debes elegir al menos un género musical."];
	}
	if (!validarLocalizacion(form.ubicacion)) {
		errores = [...errores, "El formato de localización introducido debe seguir este patrón: ES-000XX"]
	}

	return errores;
}

export const marcarCampo = (campo, valido) => {

	if (valido && campo.classList.contains("invalido")) {
		campo.classList.remove("invalido");
	}
	if (!valido && !campo.classList.contains("invalido")) {
		campo.classList.add("invalido");
	}
}