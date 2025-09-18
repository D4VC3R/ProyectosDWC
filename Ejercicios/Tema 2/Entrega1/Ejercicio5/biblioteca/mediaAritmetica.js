"use strict";

// Recorremos el array, comprobamos que sean números enteros positivos y si lo son, almacenamos su valor y aumentamos el contador de numeros válidos.
export function getMediaAritmetica(){
    let total = 0, numerosValidos = 0; // Hay que inicializar las variables o te comes un NaN como un castillo.

    for (let i = 0; i < arguments.length; i++) {
        if (Number.isInteger(arguments[i]) && arguments[i]>=0) {
            total += arguments[i];
            numerosValidos++;
        }
    }
    if (numerosValidos === 0)
        return "Introdúceme algún número entero positivo, no pido tanto.";

    return total / numerosValidos;
}

// Iba a pasar al siguiente ejercicio cuando he leido el cuadro amarillo de "utiliza arguments"...
// La dejo comentada que me da penita borrarla
/*
export function getMediaAritmetica(nums){
    let total = 0, elementos = 0; 
    
    nums.forEach(numero => {
        if (isNumero(numero) && Number.isInteger(numero) && numero>= 0) { // ¿Puede ser que Number.isInteger() haga innecesario usar isNumero()?
            total += numero;
            elementos++;
        }
    });
    return total / elementos;
}
*/