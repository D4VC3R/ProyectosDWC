"use strict";

import { comprobarForm } from "./biblioteca/forms.js";

window.onload = () => {

	document.getElementById("botonesForm").addEventListener("click", (evento) =>{
		if (evento.target.id === "guardar") {
			comprobarForm("formDiscos");
			console.log(comprobarForm("formDiscos"));
		}
	}, false);
}