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

export const generarArrayBidimensionalUnico = () => {
	// Generamos un array con 9 números aleatorios no repetidos.
	const numeros = generarArrayAleatorioUnico(1, 9, 9);
	// A partir del array generado, generamos un array bidimensional.
	return [numeros.slice(0,3), numeros.slice(3,6), numeros.slice(6,9)];
};

export const comprobarArrayBidimensional = (arrayBidimensional = [[]]) => {
	// Primero comprobamos la fila, si no hay elementos repetidos, pasamos a las columnas.
	if(arrayBidimensional.some(fila => comprobarArrayAleatorio(fila)))
		return true;

	for (let i = 0; i < arrayBidimensional[0]; i++) {
		const columna = [];
		arrayBidimensional.forEach(fila => {
			columna.push(fila[i])
		});
		if (comprobarArrayAleatorio(columna)) {
			return true;
		}
	}
	return false;
}

/* Parecía sencillo pero me he dado cuenta en el ejercicio 3 que esta función no sería reutilizable.

// Como solo necesitamos comprobar si hay números repetidos, "aplanamos" el array bidimensional
// y reutilizamos comprobarArrayAleatorio();
export const comprobarArrayBidimensional = (arrayBidimensional = [[]]) => {
	return comprobarArrayAleatorio(arrayBidimensional.flat());
};

*/

                                                // -------------------------------
                                                // Ejercicio 3 - El Sudoku        |
                                                // -------------------------------

// Ya podemos comprobar que un cuadrante no tenga números repetidos, pero nos falta comprobar cada fila y columna.

export const comprobarFilas = (arrayBidimensional = [[]]) => {
		return arrayBidimensional.some(fila => comprobarArrayAleatorio(fila));
};

export const comprobarColumnas = (arrayBidimensional = [[]]) => {
	
	// No será la mejor manera, pero con el for tradicional me cuesta menos "ver" que estoy haciendo.
	for (let i=0; i < arrayBidimensional[0].length; i++){
		const columna = [];
		// Por cada fila del array, recogemos los valores que estén en la posición i y los metemos en columna.
		// Por ejemplo, la posición 0 de cada fila, formará una columna.
		arrayBidimensional.forEach(fila =>{
			columna.push(fila[i]);
		});
		// Ya hemos llenado columna con todos los valores de la posición i, ahora comprobamos.
		if (comprobarArrayAleatorio(columna))
			return true;
	}
	// Si llegamos aquí es que ninguna columna tiene número repetidos.
	return false;
};

// Dividimos el sudoku en cuadrantes de 3x3, devolvemos un array de arrays con los valores de cada cuadrante en cada posición del array.
export const comprobarCuadrantes = (arrayBidimensional)





