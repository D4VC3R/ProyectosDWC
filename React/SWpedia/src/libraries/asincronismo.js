"use strict";

export const traerDatosBien = async (url) => {
  try {

    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(
        `Error en traerDatosBien: ${respuesta.status} - ${respuesta.statusText}`
      );
    }
    const datos = await respuesta.json();
    if (datos.results) {
      return datos.results;
    } else {
      return datos;
    }
  } catch (error) {
    throw error;
  }
}

