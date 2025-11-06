"use strict";

// -------------------------------
// Ejercicio 1 - Rompecabezas     |
// -------------------------------

import { crearImg } from "./misFunciones.js";

// Metemos la ruta a cada imagen en un array y las mezclamos.
const getPiezas = () => {
  let piezas = ["./imgs/fila-1-columna-1.jpg",
    "./imgs/fila-1-columna-2.jpg",
    "./imgs/fila-1-columna-3.jpg",
    "./imgs/fila-2-columna-1.jpg",
    "./imgs/fila-2-columna-2.jpg",
    "./imgs/fila-2-columna-3.jpg",
    "./imgs/fila-3-columna-1.jpg",
    "./imgs/fila-3-columna-2.jpg",
    "./imgs/fila-3-columna-3.jpg"
  ];
  aleatorizarArray(piezas);
  return piezas;
}

// Gracias, Fisher.
const aleatorizarArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Creamos y añadimos cada imagen del array que devuelve getPiezas() con id propio y el atributo 'draggable'.
export const addPiezas = () => {
  const listadoPiezas = document.getElementById("piezas");
  let piezas = getPiezas();

  for (let i = 0; i < piezas.length; i++) {
    let img = crearImg("pieza", piezas[i]);
    img.setAttribute("draggable", true);
    img.id = `pieza-${i}`
    listadoPiezas.append(img);
  }
}

// Función para añadir una misma clase a todos los elementos de un array.
// La utilizo para añadir clase a las casillas de la tabla.
export const addClase = (clase, elementos = []) => {
  elementos.forEach(elemento => elemento.classList.add(clase));
}

// Identifico cada casilla con su posición, empezando en 1.
// Así puedo aprovechar el src de cada imagen para comprobar si está en el sitio correcto.
export const identificarCasillas = (casillas = []) => {
  let cont = 0;
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      casillas[cont].id = `fila-${i}-columna-${j}`;
      cont++;
    }
  }
}
// Primero nos quedamos con lo que hay después de la última '/'
// y luego devolvemos el string antes del '.'.
const limpiarSrc = (src = "") => {
  let posicion = src.split('/').pop();
  return posicion.split('.').shift();
}

// Si coincide el src de la imagen en la casilla, con el id de la propia casilla, está en la posición correcta.
export const isCorrecta = (casilla) => {
  return limpiarSrc(casilla.firstChild.src) === casilla.id;
}

// Si todas las casillas son correctas...
export const isResuelto = (casillas = []) => {
  return casillas.every(casilla => isCorrecta(casilla));
}

// La utilizo cuando mueves una imagen de una casilla ya colocada, como tiene que tener si o si una de estas dos clases
// con una ternaria nos aseguramos de que vamos a quitar la clase.
export const limpiarClase = (casilla) => {
  casilla.classList.contains("casilla-correcta")
  ? casilla.classList.remove("casilla-correcta")
  : casilla.classList.remove("casilla-incorrecta")
}

export const marcarCorrecta = (casilla) => {
  limpiarClase(casilla);
  casilla.classList.add("casilla-correcta");
}

export const marcarIncorrecta = (casilla) => {
  limpiarClase(casilla);
  casilla.classList.add("casilla-incorrecta");
}

// Devolvemos los elementos a su estado inicial, quitando las clases extra a las casillas
// y devolviendo las imágenes a su contenedor original.
export const reiniciar = (piezas = [], casillas = []) => {
  casillas.forEach(casilla => {
		limpiarClase(casilla)
		casilla.classList.remove("resuelto")});

  piezas.forEach(pieza => document.getElementById("piezas").appendChild(pieza));
  aleatorizarArray(piezas);
}


