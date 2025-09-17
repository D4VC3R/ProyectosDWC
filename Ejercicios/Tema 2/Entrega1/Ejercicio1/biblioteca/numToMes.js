"use strict";

export function getMes(numero){

const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]; // Array con los nombres de cada mes

    if (isNaN(numero) || !Number.isInteger(numero)) { // Comprobación de que se ha introducido un número entero.
    return "Debes introducir un número entero."
    }

    if (numero >=1 && numero <=12) {
        return `El mes número ${numero} es ${meses[numero-1]}.` // Accedemos al nombre de cada mes por su posición en el array
    } else
        return "¿Que tal si pones un número entre 1 y 12?" // La mejor parte, insultar la inteligencia del usuario sutilmente
}