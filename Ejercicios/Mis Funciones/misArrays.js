// Genera un array de números aleatorios entre min y max.
const generarArrayAleatorio = (min, max, longitudArray) => {
  return Array.from({ length: longitudArray }, () => getNumeroAleatorio(min, max));
}

// Genera varios arrays de números aleatorios.
const generarArraysAleatorios = (cantidad, longitudArray, min, max) => {
  return Array.from({ length: cantidad }, () => generarArrayAleatorio(min, max, longitudArray));
}

// Genera un array de números aleatorios únicos dentro de un rango.
const generarArrayAleatorioUnico = (min, max, longitudArray) => {
    const arrayAleatorio = [];
    while (arrayAleatorio.length < longitudArray) {
        const num = getNumeroAleatorio(min, max);
        if (!arrayAleatorio.includes(num))
            arrayAleatorio.push(num)
    }
    return arrayAleatorio;
};

// Genera un array bidimensional 3x3 con números únicos del 1 al 9.
const generarArrayBidimensionalUnico = () => {
  const numeros = generarArrayAleatorioUnico(1, 9, 9);
  return [numeros.slice(0, 3), numeros.slice(3, 6), numeros.slice(6, 9)];
};

// Filtra un array de objetos por una propiedad con valor exacto.
const filtrarPorPropiedad = (array, propiedad, valor) => {
  return array.filter(item => item[propiedad] === valor);
}

// Filtra un array de objetos por si una propiedad incluye un texto.
const filtrarPorPropiedadIncluye = (array, propiedad, texto) => {
  return array.filter(item => item[propiedad]?.includes(texto));
}

// Filtra un array de objetos por si una propiedad (array) contiene un elemento.
const filtrarPorElementoEnArray = (array, propiedad, elemento) => {
  return array.filter(item => item[propiedad].includes(elemento));
}

// Ordena un array de objetos por una propiedad (ascendente o descendente).
const ordenarPorPropiedad = (array, propiedad, asc = true) => {
  return [...array].sort((a, b) =>
    asc
      ? a[propiedad].localeCompare(b[propiedad])
      : b[propiedad].localeCompare(a[propiedad])
  );
}

// Suma todos los números de un array númerico.
const sumaNumeros = (...numeros) => {
  return numeros.reduce((total, valor) => total + valor, 0);
}
  

// Elimina un elemento de un array de objetos por id.
const eliminarPorId = (array, id) => {
  return array.filter(item => item.id !== id);
}

// Devuelve una cadena con los elementos del array separados por comas y un punto final.
const imprimirArray = (array = []) => {
  return array.join(", ") + ".";
} 

// Devuelve una cadena con los elementos de un array formateados como lista.
const imprimirLista = (array = []) => {
  return array.length === 0
    ? "Ninguna."
    : array.map((elemento, indice) =>
        indice === array.length - 1 ? `y ${elemento}.` : `${elemento}, `
      ).join("");
}


// Comprueba si un array contiene valores repetidos.
const comprobarArrayAleatorio = (arrayAleatorio = []) => {
  return arrayAleatorio.some((valor, indice, array) => array.indexOf(valor) !== array.lastIndexOf(valor));
}