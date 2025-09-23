"use strict";

export function tablaDel(num){

    // Solo multiplica si se introduce un numero
    if (isNaN(num)) {
        return;
    }

    let resultado = "";

    for (let i = 1; i <= 10; i++) {
        resultado += `${num} x ${i} = ${num*i} \n`
    }
}