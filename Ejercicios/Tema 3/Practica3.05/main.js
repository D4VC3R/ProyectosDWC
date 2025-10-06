"use strict";

// Comprobaciones Ejercicio 1
import { generarArrayAleatorioUnico, comprobarArrayAleatorio } from "./biblioteca/ejercicios.js";

const arrayAleatorio = generarArrayAleatorioUnico(1, 9, 9);
console.log(arrayAleatorio);
console.log(comprobarArrayAleatorio(arrayAleatorio));

// Comprobaciones Ejercicio 2

import { generarArrayBidimensionalUnico, comprobarArrayBidimensional } from "./biblioteca/ejercicios.js";

const arrayBidimensional = generarArrayBidimensionalUnico();
console.log(arrayBidimensional); // ¡Ya tenemos un cuadrante del sudoku!
console.log(comprobarArrayBidimensional(arrayBidimensional));

// Comprobaciones Ejercicio 3

import { isSudokuValido } from "./biblioteca/ejercicios.js";

const sudokuValido = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];
const sudokuInvalido = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [5, 7, 2, 1, 9, 6, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];
console.log(isSudokuValido(sudokuValido));
console.log(isSudokuValido(sudokuInvalido));