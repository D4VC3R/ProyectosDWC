"use strict";

import { isPositivo, isNumero } from "../../Ejercicio2/biblioteca/analisisNumerico.js";

// Como siempre, comprobamos que se introduce un entero positivo.
export function getMultiplosTres(num){
    if(!isNumero(num) || !isPositivo(num))
        return "Introduce un número entero positivo.";

    let resultado = "|"; // Luego queda más bonito en consola.

    // Vamos guardando en la variable resultado todos los multiplos de 3 hasta llegar al número introducido.
    for (let i = 1; i <= num; i++) {
        if (i%3===0) 
            resultado += ` ${i} |`;
    }
    return resultado;
}