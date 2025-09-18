"use strict";

// Comprobamos que tanto x como y sean enteros y si es asi, comprobamos el operador.
export function calculadora(x, y, operador){
    if (Number.isInteger(x) && Number.isInteger(y)) {
        switch (operador) {
            // No utilizo el break porque todos los casos implican un return.
            case "+": return sumar(x, y);
            case "-" : return restar (x,y);
            case "*" : return multiplicar (x,y);
            case "/" : return dividir (x,y);
            case "%" : return modulo (x,y);
            default: return "Introduce un operador válido ( '+', '-', '*', '/' ó '%')"; // Si el valor no es un operador válido, salta el default.
        
        }
    }
    return "Solo calculo números enteros."; // Mensaje más bonito que recibir un NaN.
}

function sumar (x, y){
    return x + y;
}

function restar (x, y){
    return x - y;
}

function multiplicar(x, y){
    return x * y;
}

function dividir(x, y) { // Si, te la he robado.
    let division = 0;
    if (y === 0) {
        division = "No se puede dividir entre 0.";
    } else {
        division = x / y;
    }
    return division;
}

function modulo(x, y){
    return x % y;
}