"use strict";

// Comprobaciones Ejercicio 1
import { generarArrayAleatorioUnico, comprobarArrayAleatorio } from "./biblioteca/ejercicios.js";

const arrayAleatorio = generarArrayAleatorioUnico(1, 9, 9);
console.log(arrayAleatorio);
console.log(comprobarArrayAleatorio(arrayAleatorio));