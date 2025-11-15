"use strict";

// -------------------------------
// Parte II                       |
// -------------------------------

export const getFormulario = (nameForm) => {
	return document.forms[nameForm]
}

// Como título e intérprete son obligatorios, valido si o si.
export const validarTitulo = (campo) => {
	const titulo = campo.value;
	const expTitulo = /^.\w{4,}$/;

	let valido = expTitulo.test(titulo);
	marcarCampo(campo, valido);
	return valido;
}

export const validarInterprete = (campo) => {
	const interprete = campo.value;
	const expInterprete = /^.{5,}$/;
	let valido = expInterprete.test(interprete);
	marcarCampo(campo, valido);
	return valido;
}

export const validarGenero = (campo) => {
	let valido = campo.value !== "" && campo.value !== "reggaeton";
	marcarCampo(campo, valido);
	return valido;
}

// A partir de aquí, como son opcionales, solo valido si tienen contenido.
export const validarAnyo = (campo) => {
	const anyo = campo.value
	const expAnyo = / ^(19|20)\d{2}/;
	let valido = true;
	
	if (anyo.trim() !== "") {
		valido = expAnyo.test(anyo);
		marcarCampo(campo, valido);
		return valido;
	}
	return valido;
}

export const validarLocalizacion = (campo) => {
	const localizacion = campo.value
	const expLocalizacion = /^ES-\d{3}[A-Z]{2}$/;
	let valido = true;

	if (localizacion.trim() !== ""){
		valido = expLocalizacion.test(localizacion);
		marcarCampo(campo, valido);
		return valido;
	}
	return valido;
}

export const comprobarForm = (form) => {

	let arrayErrores = [];

	if (!validarTitulo(form.titulo) ) {
		arrayErrores = [...arrayErrores, "El título debe tener al menos 5 caracteres."];
	}
	if (!validarInterprete(form.interprete) ) {
		arrayErrores = [...arrayErrores, "El intérprete debe tener al menos 5 caracteres."];
	}
	if (!validarAnyo(form.anyo)) {
		arrayErrores = [...arrayErrores, "¿Seguro que tienes claro el año de publicación?"];
	}
	if (!validarGenero(form.genero)) {
		arrayErrores = [...arrayErrores, "Lo siento, tienes que elegir un género musical."];
	}
	if (!validarLocalizacion(form.localizacion) ) {
		arrayErrores = [...arrayErrores, "El formato, el formato, ¡el formato! Borra lo que hayas escrito y fíjate en el ejemplo."];
	}
	errores.length === 5 && (errores = [...errores, "Ya es difícil no rellenarme ni un solo campo bien..."]);

	return arrayErrores;
	
}

export const mostrarError = (errores) => {

	const listaErrores = document.getElementById("errores");
	listaErrores.classList.toggle("oculto");
	errores.map( error => {
		const li = document.createElement("li");
		li.textContent = error;
		listaErrores.appendChild(li);
	});
}

export const limpiarErrores = () => {
	const listaErrores = document.getElementById("errores");
	listaErrores.innerHTML = "";
	listaErrores.classList.add("oculto");
}

const marcarCampo = (campo, valido) => {
	if (!valido){
		campo.classList.add("campo-invalido");
	}
	if (valido && campo.classList.contains("campo-invalido")) {
		campo.classList.remove("campo-invalido");
	}
}

const crearDisco = (form) => {

	const disco = {
		titulo: form.titulo.value,
		interprete: form.interprete.value,
		anyo: form.anyo?.value,
		genero: form.genero?.value,
		localizacion: form.localizacion?.value,
		prestado: form.prestado?.value
	};
	return disco;
}

export const guardarDisco = (form, json) => {
	const disco = crearDisco(form);
	return [...json, disco];
}

export const mostrarDiscos = (json) => {
	const tabla = document.getElementById("tablaDiscos");
	document.getElementById("sinResultados").textContent = "";

	json.forEach(disco => {
		const fila = document.createElement("tr");
		tabla.appendChild(fila);
		for (const propiedad in disco) {
			const celda = document.createElement("td");
			celda.textContent = disco[propiedad] || "sin especificar";
			fila.appendChild(celda);
		}
	});
}

export const limpiarDiscos = () => {
  const tabla = document.getElementById("tablaDiscos");
  tabla.innerHTML = "<tr><th>Título</th><th>Intérprete</th><th>Año</th><th>Género</th><th>Localización</th><th>Prestado</th></tr>";
};

// Si alguna propiedad del disco contiene el criterio de búsqueda, lo incluyo en los resultados.
export const buscarDiscos = (json, busqueda) => {
	const resultados = json.filter( disco => 
		disco.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
		disco.interprete.toLowerCase().includes(busqueda.toLowerCase()) ||
		(disco.anyo && disco.anyo.includes(busqueda)) ||
		(disco.genero && disco.genero.toLowerCase().includes(busqueda.toLowerCase())) ||
		(disco.localizacion && disco.localizacion.toLowerCase().includes(busqueda.toLowerCase()))
	);

	return resultados;
}
