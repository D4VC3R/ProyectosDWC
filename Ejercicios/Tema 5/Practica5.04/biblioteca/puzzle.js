"use strict";

// -------------------------------
// Ejercicio 1 - Rompecabezas     |
// -------------------------------

import { insertarTabla, crearLista } from "./misFunciones.js";

export const getPiezas = () => {
  const piezas = ["./../imgs/fila-1-columna-1.jpg",
    "./../imgs/fila-1-columna-2.jpg",
    "./../imgs/fila-1-columna-3.jpg",
    "./../imgs/fila-2-columna-1.jpg",
    "./../imgs/fila-2-columna-2.jpg",
    "./../imgs/fila-2-columna-3.jpg",
    "./../imgs/fila-3-columna-1.jpg",
    "./../imgs/fila-3-columna-2.jpg",
    "./../imgs/fila-3-columna-3.jpg"
  ]
  
  const lista = crearLista(piezas.length, "piezas");
  
  for (let i = 0; i < lista.length; i++) {
    listaColores.children[i].append(piezas[i]);
  }


}