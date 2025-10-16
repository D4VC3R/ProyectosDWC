"use strict";

// Comprobaciones Ejercicio 1

import { censurarFacil, censurarNodos } from "./biblioteca/funcionesDOM.js";

/* setTimeout(() => {
    censurarFacil()
}, 1000); */

setTimeout(() =>{
    censurarNodos();
}, 1000);

// Comprobaciones Ejercicio 2

import { crearTabla, pintarPrimos } from "./biblioteca/funcionesDOM.js";

crearTabla(10, 10);
setTimeout(() =>{
    pintarPrimos();
}, 1000);

// Comprobaciones Ejercicio 3

import { addDiv, parrafosLocos } from "./biblioteca/funcionesDOM.js";

addDiv("ejercicio3");
setTimeout(() => {
    parrafosLocos("ejercicio3");
}, 1000);

// Comprobaciones Ejercicio 4

import { carrusel } from "./biblioteca/funcionesDOM.js";

addDiv("ejercicio4");
setTimeout(() => {
    carrusel("ejercicio4");
}, 1000);


