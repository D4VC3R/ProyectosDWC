"use strict";

import { traerDatos } from "./biblioteca/asincronismo.js";
import {mostrarDetalles, rellenarNav} from "./biblioteca/manejarDom.js"

window.onload = () => {
  const swAPI = "https://swapi.info/api/films";
  const listaPeliculas = document.getElementById("listadoPeliculas");


  const cargaInicial = async () => {
    try {
      const peliculasSW = await traerDatos(swAPI);
      rellenarNav(peliculasSW);

      listaPeliculas.addEventListener("click", (evento) => {
        if (evento.target.tagName === "LI") {
          const indice = parseInt(evento.target.id);
          mostrarDetalles(peliculasSW[indice]);
        }
      });
    } catch (error) {
			console.log("La página no está disponible en estos momentos.")
		}
  };

	cargaInicial();
};


