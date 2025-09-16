"use strict";

import { Persona, calcularIMC, compararIMC } from "./biblioteca/calcularIMC.js";

let juan = new Persona;
let marcos = new Persona;

juan.masa = 60;
juan.altura = 1.70; // La altura debe ser en metros para que funcione la fórmula

marcos.masa = 80;
marcos.altura = 1.75;

let juanIMC = calcularIMC(juan.masa, juan.altura);
let marcosIMC = calcularIMC(marcos.masa, marcos.altura);

console.log(`IMC de Juan: ${juanIMC}`);
console.log(`IMC de Marcos: ${marcosIMC}`);

let isMarcosGordo = compararIMC(juanIMC, marcosIMC);
console.log(`¿Está Marcos más gordo que Juan?: ${isMarcosGordo}`);


