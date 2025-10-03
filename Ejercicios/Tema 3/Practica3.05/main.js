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

import { comprobarFilas, comprobarColumnas } from "./biblioteca/ejercicios.js";

comprobarFilas(arrayBidimensional);
comprobarColumnas(arrayBidimensional);