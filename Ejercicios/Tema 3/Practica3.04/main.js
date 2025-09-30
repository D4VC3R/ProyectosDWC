"use strict";

// Comprobaciones Ejercicio 1

import { nombresPropios, pasarAMayus, ordenAlfabeticoInverso, addPropiedades} from "./biblioteca/ejercicios.js";

console.log("Ejercicio 1.");

const enMayuscula = pasarAMayus(nombresPropios);
console.log(imprimirArray(enMayuscula));

const ordenInverso = ordenAlfabeticoInverso(nombresPropios);
console.log(imprimirArray(ordenInverso));

const conPropiedades = addPropiedades(nombresPropios);
console.log(conPropiedades);

// Comprobaciones Ejercicio 2

import { getArrays, getArrayFinal, imprimirArray } from "./biblioteca/ejercicios.js";
console.log("\nEjercicio 2.");
const test = getArrays(3, 10, 1, 10);
// console.log(test); 
const testFiltrado = getArrayFinal(test, 5);
// console.log(testFiltrado);
console.log(imprimirArray(testFiltrado));

// Comprobaciones Ejercicio 3
console.log("\nEjercicio 3.");

import { usuarios } from "./biblioteca/Ejercicio3.js";
import { nuevoUsuario, addUsuario, getMayoresDeEdad, getYahoo, getUsuariosFiltrados, getUsuariosIncompletos, addApellidos, addCodigoPostal } from "./biblioteca/ejercicios.js";


console.log(usuarios);
console.log(addUsuario(usuarios, nuevoUsuario));
console.log(getMayoresDeEdad(usuarios));
console.log(getYahoo(usuarios));
console.log(getUsuariosFiltrados(usuarios));
console.log(getUsuariosIncompletos(usuarios));
console.log(addApellidos(usuarios));
console.log(addCodigoPostal(usuarios));