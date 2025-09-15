import * as Calculadora from './calculadora.js'

console.log("Suma: " + Calculadora.sumar(2,21));
console.log("Resta: " + Calculadora.restar(2,21));
console.log("División: " + Calculadora.dividir(2,21));
console.log("Multiplicación: " + Calculadora.multi(2,21));
console.log("isNaN 8? : " + isNaN(8));
console.log("isNaN \"8\"?: " + isNaN("8"));
console.log("isNaN ABCDEFGH?: " + isNaN("ABCDEFGH"));
console.log("isNaN true?: " + isNaN(true));
console.log("isNaN false?: " + isNaN(false));
