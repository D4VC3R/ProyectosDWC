"use strict";

export const traerDatos = async (url) => {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(
        `Error recuperando los datos: ${respuesta.status} - ${respuesta.statusText}`
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

