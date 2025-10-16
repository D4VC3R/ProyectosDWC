"use strict";

// Recopilación de funciones útiles de anteriores ejercicios convertidas a funciones flecha.

const isPar = (num) => {
  return isNumero(num) && num % 2 === 0;
};

const getNumeroAleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generarArrayAleatorio = (min, max, elementosArray) => {
  return Array.from({ length: elementosArray }, () =>
    getNumeroAleatorio(min, max)
  );
};

const generarArraysAleatorios = (cantidad, elementosArray, min, max) => {
  return Array.from({ length: cantidad }, () =>
    generarArrayAleatorio(min, max, elementosArray)
  );
};

const imprimirArray = (array = []) => {
  return array.join(", ") + ".";
};

const isPositivo = (num) => {
  return isNumero(num) && num > 0;
};

const isNumero = (num) => {
  return !isNaN(num);
};

const isNotaValida = (nota) => {
  return isNumero(num) && nota >= 0 && nota <= 10;
};

const sumar = (x, y) => {
  return x + y;
};

const restar = (x, y) => {
  return x - y;
};

const multiplicar = (x, y) => {
  return x * y;
};

const modulo = (x, y) => {
  return x % y;
};

const dividir = (x, y) => {
  // Si, te la he robado.
  let division = 0;
  if (y === 0) {
    division = "No se puede dividir entre 0.";
  } else {
    division = x / y;
  }
  return division;
};

const calculadora = (x, y, operador) => {
  if (Number.isInteger(x) && Number.isInteger(y)) {
    switch (operador) {
      // No utilizo el break porque todos los casos implican un return.
      case "+":
        return sumar(x, y);
      case "-":
        return restar(x, y);
      case "*":
        return multiplicar(x, y);
      case "/":
        return dividir(x, y);
      case "%":
        return modulo(x, y);
      default:
        return "Introduce un operador válido ( '+', '-', '*', '/' ó '%')"; // Si el valor no es un operador válido, salta el default.
    }
  }
  return "Solo calculo números enteros."; // Mensaje más bonito que recibir un NaN.
};

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

// Calcular la media de un array de números enteros.
const getMediaAritmetica = (nums) => {
  let total = 0,
    elementos = 0;

  nums.forEach((numero) => {
    if (isNumero(numero) && Number.isInteger(numero) && numero >= 0) {
      // ¿Puede ser que Number.isInteger() haga innecesario usar isNumero()?
      total += numero;
      elementos++;
    }
  });
  return total / elementos;
};

// Calcular la media de un array u objeto de números comprendidos entre 0 y 10, admite decimales.
// Comprueba si recibe un array o un objeto y según el caso, actúa.
const calcularMedia = (notas) => {
  let total = 0,
    elementos = 0;
  const valores = Array.isArray(notas) ? [...nums] : Object.values(notas);

  valores.forEach((numero) => {
    if (utilidades.isNumero(numero) && utilidades.isNotaValida(numero)) {
      total += numero;
      elementos++;
    }
  });
  return total / elementos;
};

export {
  isPar,
  isPrimo,
  isPositivo,
  isNumero,
  getMediaAritmetica,
  calculadora,
  isNotaValida,
  calcularMedia,
  getNumeroAleatorio,
  generarArrayAleatorio,
  generarArraysAleatorios,
};
