"use strict"

import SWapiURLs from './../assets/json/SWapiURLs.json';

export const obtenerURLs = (categoria) => {
  return SWapiURLs.SWapiURLs.map(api => api[categoria]);
};

export const formatearFecha = (fecha) => {
  const formateado = new Date(fecha);
  return formateado.toLocaleDateString();
};