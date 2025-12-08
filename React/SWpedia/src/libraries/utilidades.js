"use strict"

// Ahora no le he sacado mucho provecho pero seguro que en el futuro me viene bien tener todas las URL en un objeto
import SWapiURLs from './../assets/json/SWapiURLs.json';

// Indicamos de que sección de las APIs nos vamos a traer datos (films, people, planets...) Y devuelve un array con las direcciones de cada API.
export const obtenerURLs = (categoria) => {
  return SWapiURLs.SWapiURLs.map(api => api[categoria]);
};

export const formatearFecha = (fecha) => {
  const formateado = new Date(fecha);
  return formateado.toLocaleDateString();
};