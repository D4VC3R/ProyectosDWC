"use strict";

function isPar(num){
    return num%2 == 0;
};

function isPrimo(num){
    // Como los números primos empiezan en el 2, descartamos todo lo inferior
    if (num < 2) {
        return false;
    }
    // Comprobación de los dividores de cada número, si el módulo de algun posible divisor es 0, lanzamos el return.
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            return false; // Si entramos a este if, el numero no es primo.
        }
    }
    return true; // Si llegamos hasta aqui es que no hay divisores exactos y por lo tanto el número es primo.
};

function isPositivo(num){
    return num>0;
};

// Un poco tontería esta función pero luego queda mas claro al leer la función analisisNumerico()
function isNumero(num){ 
    return !isNaN(num);
}

export function analisisNumerico(num){
    let resultado = ""; // Resultado es una cadena vacía que iremos rellenando después de cada comprobación

    if (isNumero(num)) {
        resultado = `${num} es un número `;
    } else {
        return `${num} no es un número`; // Aqui no utilizo el operador ternario para poder utilizar el return en caso de que no se introduzca un numero.
    }
    // Ahora que estamos seguros de haber recibido un numero, lo analizamos.
    if (num == 0) {
        return resultado += `par, neutro y no primo.` // Nos quitamos el 0 ya de encima, que es muy molesto.
    }else{
        isPar(num) ? resultado += `par, ` : resultado += `impar, `;
        isPositivo(num) ? resultado += `positivo y ` : resultado += `negativo y `;
        isPrimo(num) ? resultado += `primo.` : resultado += `no primo.`;
    }

    return resultado;
}