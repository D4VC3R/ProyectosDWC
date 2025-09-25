"use strict";

// Comprobaciones Ejercicio 1
import { creaCurso } from "./biblioteca/ejercicios.js";

let alumnos = ["Paco", "Pepe"];
const curso = creaCurso("2º DAW", 2026, "Curso para frikis.", alumnos);

console.log(curso);

let alumnos2 = [...alumnos, "Juan", "María"];
const curso2 = creaCurso("1º Ganadería", 1899, "Aprende a ordeñar tus cabras.", alumnos2);



// Comprobaciones Ejercicio 2
import { mostrarObjeto } from "./biblioteca/ejercicios.js";

mostrarObjeto(curso);
mostrarObjeto(curso2);

// Comprobaciones Ejercicio 3

import { discente } from "./biblioteca/ejercicios.js";

console.log(discente.imprimirAficiones());
console.log(discente.imprimirInforme());