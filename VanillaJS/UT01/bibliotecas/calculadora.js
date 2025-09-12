/**
 * Declaración y definición de funciones a exportar.
 * */

function sumar(x, y) {
  return x + y;
}

function restar(x, y) {
  return x - y;
}

function multiplicar(x, y) {
  return x * y;
}

/**
 * Se pueden exportar directamente las funciones con 'export' antes de la función.
 * Ej: export function dividir (x, y){...}
 * */

function dividir(x, y) {
  let division = 0;
  if (y === 0) {
    division = "No se puede dividir entre 0.";
  } else {
    division = x / y;
  }
  return division;
}

/**
 *   Exporta los elementos situados entre las llaves.
 * */

export { sumar, restar, multiplicar, dividir };

/**
 * Exporta el elemento con un seudónimo.
 * */

export { multiplicar as multi };
