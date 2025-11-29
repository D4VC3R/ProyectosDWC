"use strict";

import { traerDatos } from "./biblioteca/asincronismo.js";
import {
  mostrarDetalles,
  rellenarNav,
  info404,
  reintentar,
} from "./biblioteca/manejarDom.js";

window.onload = () => {
  const swAPI = "https://swapi.info/api/films";
  const listaPeliculas = document.getElementById("listadoPeliculas");
  const estructuraInicial = document.getElementById("contenedor").outerHTML;
  let peliculasSW = [];

  // Como la página depende enteramente de la API, si no responde nos cargamos todo el HTML para mostrar un error y reintentamos la conexión.
  const cargaInicial = async () => {
    try {
      peliculasSW = await traerDatos(swAPI);
      rellenarNav(peliculasSW);
    } catch (error) {
      // También podríamos intentar conectarnos a otra API...
      info404(error);
      reintentar(estructuraInicial, cargaInicial);
    }
  };

  listaPeliculas.addEventListener("click", (evento) => {
    if (evento.target.tagName === "LI") {
      const indice = parseInt(evento.target.id); // El programadorguayquenecesitareafirmación llora al ver esta constante.
      peliculasSW[indice] && mostrarDetalles(peliculasSW[indice]); // Pequeña comprobación para asegurarnos de que el índice corresponde a una película.
    }
  });

  cargaInicial();
};
