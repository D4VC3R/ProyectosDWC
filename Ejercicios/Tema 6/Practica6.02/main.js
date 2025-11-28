"use strict";

import { traerDatos } from "./biblioteca/asincronismo.js";
import {mostrarDetalles, rellenarNav, info404, reintentar} from "./biblioteca/manejarDom.js"

window.onload = () => {
  const swAPI = "https://swapi.info/api/films";
  const listaPeliculas = document.getElementById("listadoPeliculas");
  // Te dije en clase que no funcionaba y era porque cogía el innerHTML y me quedaba sin la etiqueta de apertura. Me flagelo por ello.
  const estructuraInicial = document.getElementById("contenedor").outerHTML;



  // Como la página depende enteramente de la API, si no responde nos cargamos todo el HTML para mostrar un error y reintentamos la conexión.
  const cargaInicial = async () => {

    try {
      const peliculasSW = await traerDatos(swAPI);
      rellenarNav(peliculasSW);

      listaPeliculas.addEventListener("click", (evento) => {
        if (evento.target.tagName === "LI") {
          const indice = parseInt(evento.target.id); // El programadorguayquenecesitareafirmación llora al ver esta constante.
          mostrarDetalles(peliculasSW[indice]);
        }
      });
    } catch (error) {
      // También podríamos intentar conectarnos a otra API...
			info404();
      reintentar(estructuraInicial, cargaInicial);
		}
  };

	cargaInicial();
};


