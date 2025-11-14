"use strict";

import { comprobarForm, getFormulario, validarTitulo,validarGenero, validarAnyo, validarInterprete, validarLocalizacion, validarUrl } from "./biblioteca/forms.js";

window.onload = () => {
	const form = getFormulario("formDiscos");

	console.log(form.interprete)


	document.getElementById("botonesForm").addEventListener("click", (evento) =>{
		evento.preventDefault();
		if (evento.target.id === "guardar") {
			console.log(comprobarForm(form));
		}
	}, false);

	form.addEventListener("input", (evento)=> {
		evento.target.id === "titulo" && validarTitulo(form, evento.target.id)
		evento.target.id === "caratula" && validarUrl(form, evento.target.id)
		evento.target.id === "interprete" && validarInterprete(form, evento.target.id)
		evento.target.id === "anyo" && validarAnyo(form, evento.target.id)
		evento.target.id === "genero" && validarGenero(form, evento.target.id)
		evento.target.id === "localizacion" && validarLocalizacion(form, evento.target.id)
		
	}, false)

	
}