"use strict";

// -------------------------------
// Ejercicio 1 - Rompecabezas     |
// -------------------------------

import { crearImg } from "./misFunciones.js";

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

const aleatorizarArray = (array) => {
  array.sort(() => Math.random() - 0.5);
}

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

export const addClase = (clase, elementos = []) => {
  elementos.forEach(elemento => elemento.classList.add(clase));
}

export const reiniciar = (piezas) => {
  piezas.forEach(pieza => document.getElementById("piezas").appendChild(pieza));
  aleatorizarArray(piezas);
}

export const isCorrecto = (piezas =[]) =>{
  for (let i = 1; i <= 3; i++) {
    
    for (let j = 1; j <= 3; j++) {
      if (!piezas[i].src.contains(`fila-${i}`) || piezas[i].src.contains(`columna-${j}`)) {
        console.log(piezas[i].src.contains(`fila-${i}`))
        return false;
      }
      
    }
  }
  return true;
}
