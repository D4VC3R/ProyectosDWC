"use strict";

import { isPositivo, isNumero } from "../../Ejercicio2/biblioteca/analisisNumerico.js";

export function getMultiplosTres(num){
    if(!isNumero(num) || !isPositivo(num))
        return "Introduce un número entero positivo.";

    let resultado = "|";

    for (let i = 1; i <= num; i++) {
        if (i%3===0) 
            resultado += ` ${i} |`;
        
    }

    return resultado;
}