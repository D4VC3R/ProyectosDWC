"use strict";

import { comprobarForm, getFormulario, validarTitulo,validarGenero, validarAnyo, validarInterprete, validarLocalizacion, mostrarError, limpiarErrores, guardarDisco, mostrarDiscos, limpiarDiscos, buscarDiscos } from "./biblioteca/forms.js";

window.onload = () => {
	const form = getFormulario("formDiscos");
	let listaDiscos = [];



	form.addEventListener("click", (evento) =>{
		evento.preventDefault();
		
		if (evento.target.id === "guardar") {
			limpiarErrores();
			let errores = comprobarForm(form);
			errores.length > 0
				? mostrarError(errores)
				: listaDiscos = guardarDisco(form, listaDiscos);
		}

		if (evento.target.id === "mostrar") {
			limpiarDiscos();
			mostrarDiscos(listaDiscos);
		}

		if (evento.target.id === "buscar") {
			const criterio = form.busqueda.value;
			limpiarDiscos();
			let resultado = buscarDiscos(listaDiscos, criterio);
			resultado.length !== 0
			? mostrarDiscos(resultado)
			: document.getElementById("sinResultados").textContent = "No se han encontrado discos que coincidan con la búsqueda.";
		}
		
		if (evento.target.id === "limpiar") {
			form.busqueda.value = "";
			limpiarDiscos();
			mostrarDiscos(listaDiscos);
		}
	}, false);

	// He probado con input, change, focusin y blur, al final me quedo con input
	form.addEventListener("change", (evento) => {
		
		switch (evento.target.id) {
			case "titulo":
				validarTitulo(evento.target);
				break;
			case "interprete":
				validarInterprete(evento.target);
				break;
			case "anyo":
				validarAnyo(evento.target);
				break;
			case "genero":
				validarGenero(evento.target);
				break;
			case "localizacion":
				validarLocalizacion(evento.target);
				break;
			default: 
				break;
		}
	}, false)

	
}