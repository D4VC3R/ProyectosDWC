"use strict";

export function getPotencia(base, exponente){
    if (!Number.isInteger(base) || !Number.isInteger(exponente)) {
        return "Solo te admito dos números enteros."
    }
    let resultado = 1;

    while (exponente > 0) {
        resultado *= base;
        exponente--;
    }
    return resultado;
}