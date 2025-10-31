// ----------------
//    Utilidades   |
// ----------------

// Genera un UUID aleatorio usando la API de Crypto.
export const generarUuidAleatorio = () => crypto.randomUUID();

// Devuelve un número entero aleatorio entre min y max (ambos incluidos).
export const getNumeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Devuelve el tipo de un valor ('null', 'array', 'object', etc.).
export const getTipo = (valor) =>
  valor === null ? 'null' : Array.isArray(valor) ? 'array' : typeof valor;

//-------------------------Arrays---------------------------

// Genera un array de números aleatorios entre min y max.
const generarArrayAleatorio = (min, max, longitudArray) =>
  Array.from({ length: longitudArray }, () => getNumeroAleatorio(min, max));

// Genera varios arrays de números aleatorios.
const generarArraysAleatorios = (cantidad, longitudArray, min, max) =>
  Array.from({ length: cantidad }, () => generarArrayAleatorio(min, max, longitudArray));

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
const filtrarPorPropiedad = (array, propiedad, valor) =>
  array.filter(item => item[propiedad] === valor);

// Filtra un array de objetos por si una propiedad incluye un texto.
const filtrarPorPropiedadIncluye = (array, propiedad, texto) =>
  array.filter(item => item[propiedad]?.includes(texto));

// Filtra un array de objetos por si una propiedad (array) contiene un elemento.
const filtrarPorElementoEnArray = (array, propiedad, elemento) =>
  array.filter(item => item[propiedad].includes(elemento));

// Ordena un array de objetos por una propiedad (ascendente o descendente).
const ordenarPorPropiedad = (array, propiedad, asc = true) =>
  [...array].sort((a, b) =>
    asc
      ? a[propiedad].localeCompare(b[propiedad])
      : b[propiedad].localeCompare(a[propiedad])
  );

// Suma todos los números de un array númerico.
const sumaNumeros = (...numeros) => numeros.reduce((total, valor) => total + valor, 0);

// Elimina un elemento de un array de objetos por id.
const eliminarPorId = (array, id) =>
  array.filter(item => item.id !== id);

// Devuelve una cadena con los elementos del array separados por comas y un punto final.
const imprimirArray = (array = []) => array.join(", ") + ".";

// Devuelve una cadena con los elementos de un array formateados como lista.
const imprimirLista = (array = []) =>
  array.length === 0
    ? "Ninguna."
    : array.map((elemento, indice) =>
        indice === array.length - 1 ? `y ${elemento}.` : `${elemento}, `
      ).join("");

// Comprueba si alguna fila o columna de un array bidimensional tiene valores repetidos.
const comprobarArrayBidimensional = (arrayBidimensional = [[], [], []]) =>
  comprobarFilas(arrayBidimensional) || comprobarColumnas(arrayBidimensional);

// Comprueba si alguna fila de un array bidimensional tiene valores repetidos.
const comprobarFilas = (arrayBidimensional = [[]]) =>
  arrayBidimensional.some(fila => comprobarArrayAleatorio(fila));

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
const isSudokuValido = (arrayBidimensional = [[]]) =>
  !comprobarArrayBidimensional(arrayBidimensional) && !comprobarCuadrantes(arrayBidimensional);

// Comprueba si un array contiene valores repetidos.
const comprobarArrayAleatorio = (arrayAleatorio = []) =>
  arrayAleatorio.some((valor, indice, array) => array.indexOf(valor) !== array.lastIndexOf(valor));

//----------------------DOM-----------------------

// Reemplaza todas las apariciones de una palabra o texto en un nodo concreto.
const reemplazarTextoEnNodo = (nodo, texto, reemplazo) =>
  nodo.innerHTML = nodo.innerHTML.replaceAll(texto, reemplazo);

// Obtiene los hijos de un nodo.
const getNodos = (nodoPadre) => nodoPadre.children;

// Crea una tabla HTML con el número de filas y columnas indicado.
const crearTabla = (filas, columnas) => {
  const tabla = document.createElement("table");
  for (let i = 1; i <= filas; i++) {
    const fila = document.createElement("tr");
    for (let j = 1; j <= columnas; j++) {
      const celda = document.createElement("td");
      celda.textContent = (i - 1) * columnas + j;
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  return tabla;
};

// Añade un div con el id indicado al body.
const addDiv = (id) => {
  const div = document.createElement("div");
  div.id = id;
  document.body.appendChild(div);
  return div;
};

// Crea un párrafo y lo añade al elemento con el id indicado.
const addParrafo = (id) => {
  const p = document.createElement("p");
  document.getElementById(id).appendChild(p);
  return p;
};

// Devuelve un color RGB aleatorio.
export const colorAleatorio = () =>
  `rgb(${getNumeroAleatorio(0, 256)},${getNumeroAleatorio(0,256)},${getNumeroAleatorio(0, 256)})`;

// Crea una imagen con la clase indicada.
const crearImg = (clase) => {
  const img = document.createElement("img");
  img.classList.add(clase);
  return img;
};

// Añade una imagen a un div por id.
const anadirImg = (idDiv, img) => document.getElementById(idDiv).append(img);

//-------------------------Objetos----------------------

// Muestra las propiedades y valores de cualquier objeto por consola.
const mostrarObjeto = objeto => {
  for (const propiedad in objeto) {
    if (Object.hasOwn(objeto, propiedad)) {
      console.log(`${propiedad}: ${objeto[propiedad]}`);
    }
  }
};

// Calcula la media de los valores numéricos válidos de un objeto.
const calcularMediaNumerosObjeto = obj => {
  const valores = Object.values(obj).filter(v => isNumero(v));
  return valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
};

// Extrae todos los valores de un objeto y los almacena en un array plano
const extraerValoresObjeto = (objeto, resultado = []) => {
  for (const clave in objeto) {
    if (!tienePropiedad(objeto, clave)) continue;
    const valor = objeto[clave];

    if (isNuloOIndefinido(valor)) {
      resultado.push(valor);
    } else if (isArray(valor)) {
      if (isArrayVacio(valor)) {
        resultado.push([]);
      } else {
        valor.forEach(elemento => {
          if (isObjeto(elemento) || isArray(elemento)) {
            extraerValoresObjeto(elemento, resultado);
          } else {
            resultado.push(elemento);
          }
        });
      }
    } else if (isObjeto(valor)) {
      extraerValoresObjeto(valor, resultado);
    } else if (isFuncion(valor)) {
      resultado.push(valor); // Puedes omitir si no quieres funciones
    } else {
      resultado.push(valor);
    }
  }
  return resultado;
};


// --------------------------
//    Operaciones matemáticas |
// --------------------------

// Suma dos números.
const sumar = (x, y) => x + y;

// Resta dos números.
const restar = (x, y) => x - y;

// Multiplica dos números.
const multiplicar = (x, y) => x * y;

// Devuelve el módulo de dos números.
const modulo = (x, y) => x % y;

// Divide dos números, evitando la división por cero.
const dividir = (x, y) => y === 0 ? "No se puede dividir entre 0." : x / y;

// Calculadora básica que opera según el operador indicado.
const calculadora = (x, y, operador) => {
  switch (operador) {
    case "+": return sumar(x, y);
    case "-": return restar(x, y);
    case "*": return multiplicar(x, y);
    case "/": return dividir(x, y);
    case "%": return modulo(x, y);
    default: return "Introduce un operador válido ( '+', '-', '*', '/' ó '%')";
  }
};

// Calcula la media aritmética de un array de números válidos.
const getMediaAritmetica = (nums) => {
  let total = 0;
  let elementos = 0;
  nums.forEach((numero) => {
    if (isNumero(numero)) {
      total += numero;
      elementos++;
    }
  });
  return elementos > 0 ? total / elementos : 0;
};

// Calcula la media de notas válidas (array o objeto).
const calcularMedia = (notas) => {
  let total = 0;
  let elementos = 0;
  const valores = Array.isArray(notas) ? [...notas] : Object.values(notas);
  valores.forEach((numero) => {
    if (isNotaValida(numero)) {
      total += numero;
      elementos++;
    }
  });
  return elementos > 0 ? total / elementos : 0;
};

// Calcula el IMC.
const calcularIMC = (masa, altura) => masa / (altura * altura);

// ----------------
//  Comprobaciones |
// ----------------

// Comprueba si el valor es null o undefined.
const isNuloOIndefinido = (valor) => valor === null || valor === undefined;

// Comprueba si el valor es una cadena de texto.
const isString = (valor) => typeof valor === 'string';

// Comprueba si el valor es un número válido (no NaN).
const isNumero = (valor) => typeof valor === 'number' && !isNaN(valor);

// Comprueba si el valor es booleano.
const isBooleano = (valor) => typeof valor === 'boolean';

// Comprueba si el valor es una función.
const isFuncion = (valor) => typeof valor === 'function';

// Comprueba si el valor es un array.
const isArray = (valor) => Array.isArray(valor);

// Comprueba si el valor es un objeto (no array ni null).
const isObjeto = (valor) => typeof valor === 'object' && valor !== null && !Array.isArray(valor);

// Devuelve true si el valor es vacío (null, undefined, "", array vacío u objeto vacío).
const isVacio = (valor) =>
  valor === null ||
  valor === undefined ||
  valor === "" ||
  (Array.isArray(valor) && valor.length === 0) ||
  (typeof valor === 'object' && !Array.isArray(valor) && Object.keys(valor).length === 0);

// Devuelve true si algún campo del objeto (recursivo) está vacío.
const tieneCampoVacio = usuarios => {
  for (const clave in usuarios) {
    if (Object.hasOwn(usuarios, clave)) {
      const valor = usuarios[clave];
      if (isVacio(valor)) return true;
      if (typeof valor === 'object' && valor !== null) {
        if (tieneCampoVacio(valor)) return true;
      }
    }
  }
  return false;
};



//----------------------- Arrays -----------------------------

// Comprueba si el valor es un array con al menos un elemento.
const isArrayConElementos = (valor) => Array.isArray(valor) && valor.length > 0;

// Comprueba si todos los elementos del array cumplen una condición.
const todosCumplen = (array, callback) => Array.isArray(array) && array.every(callback);

// Comprueba si algún elemento del array cumple una condición.
const algunoCumple = (array, callback) => Array.isArray(array) && array.some(callback);

// Comprueba si el array está vacío.
const isArrayVacio = (valor) => Array.isArray(valor) && valor.length === 0;

// Comprueba si el array contiene un valor específico.
const contieneValor = (array, valor) => Array.isArray(array) && array.includes(valor);

// Comprueba si todos los elementos del array son números.
const isArrayDeNumeros = (array) => isArray(array) && array.every(isNumero);

// Comprueba si todos los elementos del array son cadenas de texto.
const isArrayDeStrings = (array) => isArray(array) && array.every(isString);


//---------------------- Objetos ----------------------

// Comprueba si el objeto tiene una propiedad específica.
const tienePropiedad = (obj, prop) => isObjeto(obj) && Object.prototype.hasOwnProperty.call(obj, prop);

// Comprueba si el objeto está vacío (sin propiedades).
const isObjetoVacio = (obj) => isObjeto(obj) && Object.keys(obj).length === 0;


//---------------------- Strings ----------------------

// Comprueba si la cadena está vacía o solo contiene espacios.
const isStringVacio = (valor) => isString(valor) && valor.trim().length === 0;

// Comprueba si la cadena es un email válido.
const isEmail = (valor) => isString(valor) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

// Devuelve true si el email termina en "@yahoo.com".
const isYahoo = (email = "") => email.endsWith("@yahoo.com");


//-------------------- Números ------------------------

// Comprueba si el número es par.
const isPar = (num) => isNumero(num) && num % 2 === 0;

// Comprueba si el número es impar.
const isImpar = (num) => isNumero(num) && num % 2 !== 0;

// Comprueba si el número es entero.
const isEntero = (num) => isNumero(num) && Number.isInteger(num);

// Comprueba si el número es decimal.
const isDecimal = (num) => isNumero(num) && !Number.isInteger(num);

// Comprueba si el número es positivo.
const isPositivo = (num) => isNumero(num) && num > 0;

// Comprueba si el número es negativo.
const isNegativo = (num) => isNumero(num) && num < 0;

// Comprueba si la nota es válida (entre 0 y 10).
const isNotaValida = (nota) => isNumero(nota) && nota >= 0 && nota <= 10;

// Comprueba si el número es primo.
const isPrimo = (num) => {
    // Como los números primos empiezan en el 2, descartamos todo lo inferior.
    if (num < 2 || !isNumero(num)) {
        return false;
    }
    // Comprobación de los dividores de cada número, si el módulo de algun posible divisor es 0, lanzamos el return.
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            return false; // Si entramos a este if, el número no es primo y dejamos de comprobar.
        }
    }
    return true; // Si llegamos hasta aqui es que no hay divisores exactos y por lo tanto el número es primo.
};

// Comprueba si la edad es mayor o igual a 18.
const isMayorEdad = (edad) => isPositivo(edad) && edad >= 18;


//------------------
// Imprimir objetos |
//------------------


const tratarNull = (clave, valor) => {
    console.log(`La clave: "${clave}" es ${valor}.`);
};

const tratarArrayVacio = (clave) => {
    console.log(`La clave: "${clave}" es de tipo array y está vacío.`);
};

// Si el array tiene elementos, informamos, pero que los identifique otro...
const tratarArrayLleno = (clave, valor) => {
    console.log(`La clave: "${clave}" es de tipo array y tiene ${valor.length} elementos.`);
    valor.forEach((elemento, indice) => {
        identificarElementos(elemento, indice);
    });
};

// Yo los identifico, pero como sea un objeto... qué pereza, paso el testigo.
const identificarElementos = (elemento, indice) => {
    const tipoElemento = typeof elemento;
    
    if (tipoElemento === 'object' && elemento !== null) {
        console.log(`Posición ${indice}: es de tipo ${tipoElemento} y tiene las siguientes propiedades:`);
        imprimirObjetoPro(elemento);
    } else {
        console.log(`Posición ${indice}: es de tipo ${tipoElemento} y su valor es ${elemento}.`);
    }
};

// Éste es el gitano que te pregunta qué llevas en los bolsillos.
const tratarArray = (clave, valor) => {
    if (valor.length === 0) {
        tratarArrayVacio(clave);
    } else {
        tratarArrayLleno(clave, valor);
    }
};

// Ok, eres un objeto, pero lo que lleves dentro no es cosa mía.
const tratarObjeto = (clave, valor) => {
    console.log(`La clave: "${clave}" es de tipo objeto y tiene las siguientes propiedades:`);
    imprimirObjetoPro(valor);
};

// Quizás me podría ahorrar el switch, pero me viene bien tener ese segundo default por si no logra identificar el objeto.
const tratarPrimitivos = (clave, valor, tipo) => {
    switch (tipo) {
        case 'number':
        case 'string':
        case 'boolean':
        case 'undefined':
            console.log(`La clave: "${clave}" es de tipo ${tipo} y su valor es ${valor}.`);
            break;
        default: 
            console.log(`Me has pillado, no sé de qué tipo es la clave: "${clave}".`);
            break;
    }
};

const tratarFuncion = (clave, valor) => {
    console.log(`La clave: "${clave}" es una función con ${valor.length} parámetros y este es su contenido:`);
    console.log(`${valor.toString()}`);
};

// La función principal es basicamente un switch que le pasa la faena al resto de funciones por cada elemento que tenga el objeto. 
export const imprimirObjetoPro = (objeto) => {
    for (const clave in objeto) {
        if (!Object.hasOwn(objeto, clave)) continue;
        
        const valor = objeto[clave];
        const tipo = getTipo(valor);
        
        switch (tipo) {
            case 'null':
                tratarNull(clave, valor);
                break;
            case 'array':
                tratarArray(clave, valor);
                break;
            case 'object':
                tratarObjeto(clave, valor);
                break;
            case 'function':
                tratarFuncion(clave, valor);
                break;
            default:
                tratarPrimitivos(clave, valor, tipo);
                break;
        }
    }
};

