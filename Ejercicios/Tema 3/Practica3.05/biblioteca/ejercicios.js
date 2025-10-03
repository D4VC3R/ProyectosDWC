"use strict";

import { getNumeroAleatorio } from "../../Practica3.04/biblioteca/misFuncionesNumericas.js";

                                                // -------------------------------
                                                // Ejercicio 1 - El inicio        |
                                                // -------------------------------



// Parecida a la de la práctica 3.04 pero asegurando que no se repiten números.
export const generarArrayAleatorioUnico = (min, max, elementosArray) => {
    const arrayAleatorio = [];
		
		while (arrayAleatorio.length<elementosArray){
			// Generamos un número aleatorio y lo almacenamos.
			const num = getNumeroAleatorio(min, max);
			// Si el array no contiene ya ese número, lo metemos.
			if (!arrayAleatorio.includes(num))
				arrayAleatorio.push(num)
		}
		return arrayAleatorio;
};

// Si el índice de un valor no es la última posición donde aparece, es que está repetido.
export const comprobarArrayAleatorio = (arrayAleatorio = []) => {
    return arrayAleatorio.some((valor, indice, array) => array.indexOf(valor) !== array.lastIndexOf(valor));
};

                                                // -------------------------------
                                                // Ejercicio 2 - El avance        |
                                                // -------------------------------

const generarArrayBidimensionalUnico = () => {
	// Generamos un array con 9 números aleatorios no repetidos.
	const numeros = generarArrayAleatorioUnico(1, 9, 9);
	// A partir del array generado, generamos un array bidimensional
	return [numeros.slice(0,3), numeros.slice(3,6), numeros.slice(6,9)];
};
