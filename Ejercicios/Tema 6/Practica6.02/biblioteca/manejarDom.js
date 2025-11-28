"use strict";

// Por no llenar el main de declaraciones, esta vez cojo el elemento que necesito dentro de la función que lo va a usar en lugar de pasárselo como parámetrro.
export const rellenarNav = (datos) => {
  const listaPeliculas = document.getElementById("listadoPeliculas");

  (Array.isArray(datos) && datos.length !== 0)
	&&
    datos.forEach((pelicula, indice) => {
      listaPeliculas.appendChild(crearLiPelicula(pelicula, indice));
    });
};

const crearLiPelicula = (pelicula, indice) => {
  const li = document.createElement("li");
  li.innerHTML = `Episodio ${pelicula.episode_id}: ${pelicula.title}`;
  li.id = indice;
  return li;
};

// Plantilla sencilla para el título de la película.
const rellenarHeader = (pelicula) => {
  const header = document.getElementById("tituloPelicula");
  header.classList.add("cabecera");
  header.innerHTML = pelicula.title;
};

const formatearFecha = (fecha) => {
  const formateado = new Date(fecha);
  return formateado.toLocaleDateString();
};

// Plantilla sencilla para el contenido de la película.
const rellenarContenido = (pelicula) => {
  const infoPeli = document.getElementById("datosPelicula");

  infoPeli.innerHTML = `<p><span>Director:</span> ${pelicula.director}</p>
		<p><span>Productor:</span> ${pelicula.producer}</p>
		<p><span>Estreno:</span> ${formatearFecha(pelicula.release_date)}</p>
		<div><p><span>Sinopsis:</span>
		<cite>${pelicula.opening_crawl}</cite></p>
		</div>`;
};

// Juntamos ambas plantillas en una única función para llevarnos al main y que quede todo clarito.
export const mostrarDetalles = (pelicula) => {
  rellenarHeader(pelicula);
  rellenarContenido(pelicula);
};

// Modificamos la página por completo y mostramos el error de conexión.
export const info404 = (error) => {
  const contenedor = document.getElementById("contenedor");
  contenedor.classList.add("noCarga");
  contenedor.innerHTML = `La página no está disponible en estos momentos: ${error.message}`;
};

// Cada 5 segundos, devolvemos la página a su estado inicial y reintentamos la conexión. 
// Luego nos preguntamos por qué está caida siempre la API...
export const reintentar = (estadoInicial, cargaInicial) => {
  setTimeout(() => {
    document.getElementById("contenedor").outerHTML = estadoInicial;
    cargaInicial();
  }, 5000);
};
