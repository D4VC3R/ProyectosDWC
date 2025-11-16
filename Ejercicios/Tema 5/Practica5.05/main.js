"use strict";

import { comprobarForm, getFormulario, validarTitulo,validarGenero, validarAnyo, validarInterprete, validarLocalizacion, mostrarError, 
	limpiarErrores, guardarDisco, mostrarDiscos, limpiarListado, buscarDiscos, eliminarDisco, guardarListadoDiscos, getListadoDiscos, mostrarExito, ocultarExito } from "./biblioteca/forms.js";

window.onload = () => {
	const form = getFormulario("formDiscos");
	// Cargamos el listado de discos, si no hay nada, será un array vacío.
	let listaDiscos = getListadoDiscos() || [];


	form.addEventListener("click", (evento) =>{
		evento.preventDefault();
		console.log(evento.target)
		// Cada vez que se intente guardar, hay que limpiar los mensajes previos para no acabar con una lista infinita de errores.
		if (evento.target.id === "guardar") {
			limpiarErrores();
			ocultarExito();
			let errores = comprobarForm(form);
			// Si comprobarForm devuelve un array vacío, hemos triunfado. Guardamos el disco en la lista, la lista en el localStorage, limpiamos el formulario y chuche para el usuario.
			if (errores.length === 0){
				listaDiscos = guardarDisco(form, listaDiscos);
				guardarListadoDiscos(listaDiscos);
				form.reset();
				mostrarExito();
			} else {
				mostrarError(errores);
			}
		}
		// Para no duplicar contenido, limpio el listado antes de mostrarlo de nuevo. Si hay algún mensaje de éxito previo, ya habrá tenido tiempo de leerlo así que me lo cargo.
		if (evento.target.id === "mostrar") {
			limpiarListado();
			ocultarExito();
			mostrarDiscos(listaDiscos);
		}
		// Lo mismo, limpiamos lo que haya y mostramos lo que haya encontrado (o no) la búsqueda.
		if (evento.target.id === "buscar") {
			const criterio = form.busqueda.value;
			ocultarExito();
			limpiarListado();
			let resultado = buscarDiscos(listaDiscos, criterio);
			resultado.length !== 0
			? mostrarDiscos(resultado)
			: document.getElementById("sinResultados").textContent = "No se han encontrado discos que coincidan con la búsqueda.";
		}
		// Limpiamos el campo de búsqueda, el listado y cualquier mensaje de éxito que pudiera haber.
		if (evento.target.id === "limpiar") {
			form.busqueda.value = "";
			limpiarListado();
			ocultarExito();
		}
	}, false);

	// He probado con input, change, focusin y blur, al final me quedo con input, blur prometía bastante pero no he sabido hacerlo funcionar.
	form.addEventListener("change", (evento) => {
		// Otra vez esta función, si el usuario es un máquina y después de añadir bien un disco quiere añadir otro, no tiene sentido mantener el mensaje de éxito en el momento se pone a rellenar campos de nuevo.
		ocultarExito();
		
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

	document.getElementById("contenedorDiscos").addEventListener("click", (evento) => {
		if (evento.target.classList.contains("borrar")){
			// Si, otra vez.
			ocultarExito();
			if (confirm("¿Seguro que quieres borrar este disco?")) {
				// Si confirma, quitamos el disco de la lista, guardamos la lista actualizada, limpiamos y mostramos la nueva lista.
				listaDiscos = eliminarDisco(listaDiscos, evento.target.id);
				guardarListadoDiscos(listaDiscos);
				limpiarListado();
				mostrarDiscos(listaDiscos);
			}
		}
	}, false);

	/** Divagaciones:
	 * Lo que menos me ha gustado es tener que usar ocularExito() en tantos sitios, pero no se me ha ocurrido otra forma de hacerlo.
	 * Según creo, en el momento el usuario se pone a toquetear cualquier cosa del formulario, el mensaje de éxito ya no le interesa y no tiene sentido mantenerlo.
	 * 
	 * Y me hubiera gustado hacer el popup de error que saliera al lado del campo que falla, con un appendChild al campo no válido de un <span> con el mensaje de error, 
	 * pero no he sabido hacerlo funcionar bien y quedaba fatal, me descuadraba el formulario, me complicaba el código... al final lo he dejado. Cuando mi CSS no de pena igual me animo a hacerlo.
	 * 
	 * Es la práctica que más me ha costado sacar hasta ahora, con diferencia.
	 */
	
}// Fin del window.onload