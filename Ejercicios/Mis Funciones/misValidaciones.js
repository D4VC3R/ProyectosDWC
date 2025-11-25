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
const isVacio = (valor) => {
  return valor === null ||
  valor === undefined ||
  valor === "" ||
  (Array.isArray(valor) && valor.length === 0) ||
  (typeof valor === 'object' && !Array.isArray(valor) && Object.keys(valor).length === 0);
}


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