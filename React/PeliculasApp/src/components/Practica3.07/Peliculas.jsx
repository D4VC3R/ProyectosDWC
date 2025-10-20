import React from 'react'
import listado from "./../../assets/json/peliculas.json"
import Pelicula from '../Ejercicio3/Pelicula.jsx';
import "./Peliculas.css"
import { useRef } from 'react';




const Peliculas = () => {
	const listadoPeliculas = listado;
	// console.log(listadoPeliculas)


	return (
		
		<div className='peliculas_peliculas'>
			{listadoPeliculas.peliculas.length
			? listadoPeliculas.peliculas.map((pelicula) =>{
				return (
					<Pelicula
					key={pelicula.id}
					cartelera = {pelicula.cartelera}
					titulo = {pelicula.nombre}
					director = {pelicula.director}
					cartel = {pelicula.cartelera}
					clasificacion = {pelicula.clasificacion}
					resumen = {pelicula.resumen}
					actores = {pelicula.actores}
					recaudacion = {pelicula.recaudacion}
					>
					</Pelicula>
				);
			})
			:"No hay películas."}
		</div>
	);
};

export default Peliculas;