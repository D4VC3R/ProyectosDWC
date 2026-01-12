"use strict";
import { controlarClic, getFormulario, getListadoDiscos } from "./bibloteca/manejarDom.js";
import { validarCampos, validarForm } from "./bibloteca/validaciones.js";

window.onload = () => {


	const form = getFormulario("form");

	console.log(getListadoDiscos(localStorage.getItem("discos")));

	form.addEventListener("change", ((e)=>{
		validarCampos(e.target);
	}),false);

form.addEventListener("click", ((e)=>{
	controlarClic(e.target);
}),false);



}// Fin del window.onload.