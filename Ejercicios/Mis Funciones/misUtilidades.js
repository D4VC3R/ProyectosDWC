// Genera un UUID aleatorio usando la API de Crypto.
export const generarUuidAleatorio = () => {
	return crypto.randomUUID();
} 

// Devuelve un número entero aleatorio entre min y max (ambos incluidos).
export const getNumeroAleatorio = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
} 

// Devuelve el tipo de un valor ('null', 'array', 'object', etc.).
export const getTipo = (valor) => {
  return valor === null ? 'null' : Array.isArray(valor) ? 'array' : typeof valor;
}
// Devuelve un color RGB aleatorio.
export const colorAleatorio = () => {
	return `rgb(${getNumeroAleatorio(0, 256)},${getNumeroAleatorio(0,256)},${getNumeroAleatorio(0, 256)})`;
}
