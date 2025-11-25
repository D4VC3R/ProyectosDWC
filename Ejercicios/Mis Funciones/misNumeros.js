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