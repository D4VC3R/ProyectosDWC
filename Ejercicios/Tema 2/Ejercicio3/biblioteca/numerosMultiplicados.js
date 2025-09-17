"use strict";

export function numerosMultiplicados (repeticiones, numeroMultiplicado){

    let resultados = [];
    resultados.push(numeroMultiplicado);

    for (let i = 1; i < repeticiones; i++) {
        numeroMultiplicado = numeroMultiplicado*2;
        resultados.push(numeroMultiplicado);
        
    }
    return resultados;
}