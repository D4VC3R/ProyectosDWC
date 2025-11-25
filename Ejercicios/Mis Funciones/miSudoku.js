// Comprueba si alguna fila o columna de un array bidimensional tiene valores repetidos.
const comprobarArrayBidimensional = (arrayBidimensional = [[], [], []]) => {
  return comprobarFilas(arrayBidimensional) || comprobarColumnas(arrayBidimensional);
}

// Comprueba si alguna fila de un array bidimensional tiene valores repetidos.
const comprobarFilas = (arrayBidimensional = [[]]) => {
  return arrayBidimensional.some(fila => comprobarArrayAleatorio(fila));
}

// Comprueba si alguna columna de un array bidimensional tiene valores repetidos.
const comprobarColumnas = (arrayBidimensional = [[]]) => {
  for (let i = 0; i < arrayBidimensional[0].length; i++) {
    const columna = [];
    arrayBidimensional.forEach(fila => columna.push(fila[i]));
    if (comprobarArrayAleatorio(columna)) return true;
  }
  return false;
};

// Comprueba si algún cuadrante 3x3 de un array bidimensional tiene valores repetidos.
const comprobarCuadrantes = (arrayBidimensional = [[]]) => {
  const indices = [0, 3, 6];
  for (const fila of indices) {
    for (const columna of indices) {
      const cuadrante = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          cuadrante.push(arrayBidimensional[fila + i][columna + j]);
        }
      }
      if (comprobarArrayAleatorio(cuadrante)) return true;
    }
  }
  return false;
};

// Comprueba si un sudoku es válido (sin repetidos en filas, columnas ni cuadrantes).
const isSudokuValido = (arrayBidimensional = [[]]) => {
  return !comprobarArrayBidimensional(arrayBidimensional) && !comprobarCuadrantes(arrayBidimensional);
}