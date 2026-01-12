"use strict";
import { validarFormulario } from "./validaciones.js";
import {
  limpiarListado,
  getCabecera,
  formatearEstado,
  formatearGenero,
} from "./utilidades.js";

export const guardarDisco = (formValidado, coleccion) => {
  const disco = crearDisco(formValidado);
  coleccion = [...coleccion, disco];
  guardarDiscos(coleccion);
  formValidado.reset();
  return coleccion;
};

const crearDisco = (form) => {
  return {
    id: crypto.randomUUID(),
    titulo: form.titulo.value,
    interprete: form.interprete.value,
    anyo: form.anyo?.value,
    caratula: form.caratula?.value,
    genero: form.genero.value,
    localizacion: form.localizacion.value.toUpperCase(),
    prestado: form.prestado.checked,
  };
};

export const mostrarErrores = (form) => {
  const errores = validarFormulario(form);
  const ul = document.getElementById("errores");
  errores.forEach((error) => {
    const li = document.createElement("li");
    li.textContent = error;
    ul.appendChild(li);
  });
  limpiarErrores();
};

const limpiarErrores = () => {
  const ul = document.getElementById("errores");
  setTimeout(() => {
    ul.innerHTML = "";
  }, 3000);
};

export const cargarDiscos = () => {
  return JSON.parse(localStorage.getItem("coleccion_de_discos"));
};

const guardarDiscos = (coleccion) => {
  localStorage.setItem("coleccion_de_discos", JSON.stringify(coleccion));
};

export const manejarExito = (form, coleccion) => {
  guardarDisco(form, coleccion);
  form.reset();
  msjExito();
  mostrarDiscos(coleccion);
}

const msjExito = () => {
  const p =document.getElementById("exito");
  setTimeout(() => {
    p.classList.toggle("oculto");
  }, 2000);
  p.classList.toggle("oculto");
}

const mostrarDisco = (disco) => {
  const fila = document.createElement("tr");
  const columnas = getCabecera();

  columnas.forEach((columna) => {
    const celda = document.createElement("td");

    if (columna === "caratula") {
      const img = document.createElement("img");
      img.src = disco.caratula || "";
      img.alt = `Carátula de ${disco.titulo}`;
      img.className = "caratula";
      celda.appendChild(img);
    } else if (columna === "genero") {
      celda.textContent = formatearGenero(disco[columna]);
    } else if (columna === "prestado") {
      celda.textContent = formatearEstado(disco[columna]);
    } else {
      celda.textContent = disco[columna] || "Sin especificar";
    }
    fila.appendChild(celda);
  });
  const celdaBoton = document.createElement("td");
  celdaBoton.appendChild(botonEliminar(disco.id));
  fila.appendChild(celdaBoton);
  
  return fila;
};

export const mostrarDiscos = (coleccion) => {
  const tabla = document.getElementById("tablaDiscos");
  const p = document.getElementById("sinResultados");
  limpiarListado();

  if (Array.isArray(coleccion) && coleccion.length > 0) {
    p.innerText = "";
    tabla.classList.remove("oculto");
    coleccion.forEach((disco) => {
      tabla.appendChild(mostrarDisco(disco));
    });
  } else {
		tabla.classList.add("oculto");
    p.innerText = "Sin resultados.";
  }
};

const botonEliminar = (id) => {
  const boton = document.createElement("button");
  boton.className = "borrar";
  boton.id = id;
  boton.textContent = "X";
  return boton;
};

export const buscarDiscos = (busqueda, coleccion) => {
  const resultados = coleccion.filter(
    (disco) =>
      disco.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      disco.interprete.toLowerCase().includes(busqueda.toLowerCase()) ||
      disco.anyo.includes(busqueda) ||
      formatearGenero(disco.genero).toLowerCase().includes(busqueda.toLowerCase()) ||
      disco.localizacion.toLowerCase().includes(busqueda.toLowerCase())
  );
  
	mostrarDiscos(resultados);
};

export const borrarDisco = (id, coleccion) => {
	const filtrado = coleccion.filter((disco) => disco.id !== id);
	guardarDiscos(filtrado);
	return filtrado;
}
