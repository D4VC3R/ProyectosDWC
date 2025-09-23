"use strict";

export function sumaNumeros(){

    // Convertimos arguments a un array para operar con el mas facilmente utilizando métodos.
    const numeros = Array.from(arguments); 
    let total = 0;

    // Si vienen menos de dos parámetros, descartado!
    if (numeros < 2) {
        return "Parámetros insuficientes."
    }

    // Si todos los elementos de numeros son, efectivamente, numeros, calculamos la suma y si no, informamos.
    if(numeros.every(num => !isNaN(num))) { 
        numeros.forEach(valor => {
            total += valor;
            });
            return `Resultado: ${total}`;
        } else {
            return "Solo admito números."
        }
    
    /*
    // Esto sería en el caso de querer hacer la suma en caso de tener dos o mas numeros,
    // aunque se introduzcan valores inválidos.

    let valoresValidos = 0;

    numeros.forEach(valor => {
        if (!isNaN(valor)) {
            total += valor;
            valoresValidos++
        }
    });

    if (valoresValidos >= 2) {
        return `Resultado: ${total}`;
    } else {
        return "Introduce al menos dos números."
    }
    
    */
}