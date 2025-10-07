"use strict";

import { getNumeroAleatorio } from "./misFuncionesNumericas.js";

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

// Si la primera aparición de un valor (indexOf) no es también la última (lastIndexOf), es que está repetido.
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

export const comprobarArrayBidimensional = (arrayBidimensional = [[],[],[]]) => {
	return comprobarFilas(arrayBidimensional) || comprobarColumnas(arrayBidimensional);
};

const comprobarFilas = (arrayBidimensional = [[]]) => {
		return arrayBidimensional.some(fila => comprobarArrayAleatorio(fila));
};

const comprobarColumnas = (arrayBidimensional = [[]]) => {
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
	// Si llegamos aquí es que ninguna columna tiene números repetidos.
	return false;
};


/* Me he dado cuenta en el ejercicio 3 que esta función no sería reutilizable porque pierdo la información sobre las filas y columnas.

// Como solo necesitamos comprobar si hay números repetidos, "aplanamos" el array bidimensional
// y reutilizamos comprobarArrayAleatorio();
export const comprobarArrayBidimensional = (arrayBidimensional = [[]]) => {
	return comprobarArrayAleatorio(arrayBidimensional.flat());
};

*/

                                                // -------------------------------
                                                // Ejercicio 3 - El Sudoku        |
                                                // -------------------------------


// Ya podemos comprobar que una fila o columna no tenga valores repetidos, pero falta comprobar cada cuadrante de 3x3 dentro del sudoku.
const comprobarCuadrantes = (arrayBidimensional =[[]]) => {
	const indices = [0, 3, 6]; // Índices del array donde cambiamos de cuadrante.

	//  Dos bucles para recorrer los inicios de cada cuadrante.
	for (const fila of indices) {
		for (const columna of indices) {
			const cuadrante = [];
			// Para cada cuadrante, recorremos sus 3 filas y 3 columnas.
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					cuadrante.push(arrayBidimensional[fila + i][columna + j]);
				}
			}
			if (comprobarArrayAleatorio(cuadrante)) {
				return true;
			}
		}
	}
	return false;
};

// Como las funciones devuelven true si hay repetidos, hay que negar la lógica para que devuelva true si el sudoku es válido.
export const isSudokuValido = (arrayBidimensional = [[]]) => {
	return !comprobarArrayBidimensional(arrayBidimensional) && !comprobarCuadrantes(arrayBidimensional);
};






