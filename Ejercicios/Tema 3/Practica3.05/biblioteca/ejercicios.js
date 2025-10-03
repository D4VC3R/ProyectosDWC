"use strict";

import { getNumeroAleatorio } from "../../Practica3.04/biblioteca/misFuncionesNumericas.js";

                                                // -------------------------------
                                                // Ejercicio 1 - El inicio        |
                                                // -------------------------------



// Reutilizo la función que preparé para la práctica 3.04.
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
