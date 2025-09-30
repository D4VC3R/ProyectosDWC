"use strict";


// Comprobaciones Ejercicio 1
console.log("Ejercicio 1.");

import { nombresPropios, pasarAMayus, ordenAlfabeticoInverso, addPropiedades} from "./biblioteca/ejercicios.js";

const enMayuscula = pasarAMayus(nombresPropios);
console.log(imprimirArray(enMayuscula));

const ordenInverso = ordenAlfabeticoInverso(nombresPropios);
console.log(imprimirArray(ordenInverso));

const conPropiedades = addPropiedades(nombresPropios);
console.log(conPropiedades);


// Comprobaciones Ejercicio 2
console.log("\nEjercicio 2.");

import { getArrays, getArrayFinal, imprimirArray } from "./biblioteca/ejercicios.js";

const test = getArrays(3, 10, 1, 10);
// console.log(test); 
const testFiltrado = getArrayFinal(test, 5);
// console.log(testFiltrado);
console.log(imprimirArray(testFiltrado));


// Comprobaciones Ejercicio 3
console.log("\nEjercicio 3.");

import { usuarios } from "./biblioteca/Ejercicio3.js";
import { nuevoUsuario, addUsuario, getMayoresDeEdad, getYahoo, getUsuariosFiltrados, getUsuariosIncompletos, addApellidos, addCodigoPostal } from "./biblioteca/ejercicios.js";


console.log("Usuarios originales:", usuarios);
console.log("Usuario añadido:", addUsuario(usuarios, nuevoUsuario));
console.log("Usuarios mayores de edad:", getMayoresDeEdad(usuarios));
console.log("Usuarios con Yahoo:", getYahoo(usuarios));
console.log("Usuarios españoles y mayores de edad con tema claro:", getUsuariosFiltrados(usuarios));
console.log("Usuarios incompletos:", getUsuariosIncompletos(usuarios));
console.log("Usuarios con el campo 'apellidos' añadido:", addApellidos(usuarios));
console.log("Usuarios con el campo 'código' añadido:", addCodigoPostal(usuarios));