"use strict";

  export const rellenarNav = (datos) => {
		const listaPeliculas = document.getElementById("listadoPeliculas");

		(Array.isArray(datos) && datos.length!==0)
		&&
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
		header.classList.add("cabecera");
  };

  const rellenarContenido = (pelicula) => {
		const infoPeli = document.getElementById("datosPelicula");

  infoPeli.innerHTML = `<p><span>Director:</span>: ${pelicula.director}</p>
		<p><span>Productor:</span> ${pelicula.producer}</p>
		<p><span>Estreno:</span> ${formatearFecha(pelicula.release_date)}</p>
		<div><span>Sinopsis</span>
		<cite>${pelicula.opening_crawl}</cite>
		</div>`;
  };

	export const info404 = () =>{
		const contenedor = document.getElementById("contenedor");
		contenedor.classList.add("noCarga");
		contenedor.innerHTML= "La página no está disponible en estos momentos.";
	}

	const formatearFecha = (fecha) => {
		const formateado = new Date(fecha);
		return formateado.toLocaleDateString();
	}

	export const reintentar = (estadoInicial, cargaInicial) => {
		setTimeout(() => {
			document.getElementById("contenedor").innerHTML = estadoInicial;
			cargaInicial();
		}, 5000);
	}