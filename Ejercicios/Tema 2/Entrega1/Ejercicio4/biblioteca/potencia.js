"use strict";

// Comprobamos que sean numeros enteros y además que el exponente sea 0 o positivo, que si no me rompes la función.
export function getPotencia(base, exponente){
    if (!Number.isInteger(base) || !Number.isInteger(exponente) || exponente < 0) {
        return "Solo te admito dos números enteros. Además, el exponente lo quiero cero o positivo.";
    }
    let resultado = 1; // Inicializamos a 1 que es el elemento neutro de la multiplicación.

    // Exponente actúa de contador de cuántas veces tenemos que multiplicar la base por si misma.
    while (exponente > 0) {
        resultado *= base;
        exponente--;
    }
    return resultado;
}