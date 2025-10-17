import React from 'react'
import listado from "./../../assets/json/peliculas.json"
import Pelicula from '../Ejercicio3/Pelicula';

const listadoPeliculas = listado;
console.log(listadoPeliculas)

const Peliculas = () => {
	return (
		<div className='peliculas_peliculas'>
			{listadoPeliculas.peliculas.length
			? listadoPeliculas.peliculas.map((pelicula) =>{
				return (
					<Pelicula
					key={pelicula.id}
					titulo = {pelicula.nombre}
					director = {pelicula.director}
					cartel = {pelicula.cartelera}
					clasificacion = {pelicula.clasificacion}
					resumen = {pelicula.resumen}
					>

					</Pelicula>
				);
			})
			:"No hay películas."}
		</div>
	);
};

export default Peliculas;