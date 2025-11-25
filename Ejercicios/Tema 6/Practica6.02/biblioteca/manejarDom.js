"use strict";

  export const rellenarNav = (datos) => {
		const listaPeliculas = document.getElementById("listadoPeliculas");

    datos.forEach((pelicula, indice) => {
      const li = document.createElement("li");
      li.innerHTML = `Episodio ${pelicula.episode_id}: ${pelicula.title}`;
      li.id = indice;
      listaPeliculas.appendChild(li);
    });
  };

  export const mostrarDetalles = (pelicula) => {
    rellenarHeader(pelicula);
    rellenarContenido(pelicula);
  };

  const rellenarHeader = (pelicula) => {
		const header = document.getElementById("tituloPelicula");
    header.innerHTML = pelicula.title;
  };

  const rellenarContenido = (pelicula) => {
		const infoPeli = document.getElementById("datosPelicula");

    infoPeli.innerHTML = `<p>Director: ${pelicula.director}</p>
	<p>Productor: ${pelicula.producer}</p>
	<p>Estreno: ${pelicula.release_date}</p>
	<p>Sinopsis:</p>
	<cite>${pelicula.opening_crawl}</cite>`;
  };