"use strict";

// Comprobaciones Ejercicio 1
console.log("Ejercicio 1: Constructor");

import { creaCurso } from "./biblioteca/ejercicios.js";

let alumnos = ["Paco", "Pepe"];
const curso = creaCurso("2º DAW", 2026, "Curso para frikis.", alumnos);

console.log(curso);

// Comprobaciones Ejercicio 2
console.log("");
console.log("Ejercicio 2: Mostrando objetos");

import { mostrarObjeto } from "./biblioteca/ejercicios.js";

mostrarObjeto(curso);

// Comprobaciones Ejercicio 3
console.log("");
console.log("Ejercicio 3: Recorriendo objetos");

import { discente } from "./biblioteca/ejercicios.js";

console.log(discente.imprimirAficiones());
console.log(discente.imprimirInforme());

// Comprobaciones Ejercicio 4
console.log("");
console.log("Ejercicio 4: Modificando objetos");

import { addMatricula } from "./biblioteca/ejercicios.js";

let alumnos2 = [...alumnos, "Juan", "María"];
const curso2 = creaCurso("1º Ganadería", 1900, "Aprende a ordeñar tus cabras.", alumnos2);

addMatricula(curso2);
curso2.matricular(discente);
console.log(curso2);

// Comprobaciones Ejercicio 5
console.log("");
console.log("Ejercicio 5: Mostrando objetos Pro Special Deluxe HD");

import { imprimirObjetoPro } from "./biblioteca/ejercicios.js";

imprimirObjetoPro(curso2);
