import React from 'react'
import {useParams} from 'react-router-dom'
import listadoPeliculas from "./../assets/json/peliculas.json"
import Pelicula from '../components/peliculas/Pelicula';

const PeliculaDetalle = () => {

	const {id} = useParams();

	const pelicula = listadoPeliculas.peliculas.find(pelicula => pelicula.id === parseInt(id));
	return (
		<>
			<h2>Detalle de la película</h2>
			<Pelicula {...pelicula} />
		</>
	)
}

export default PeliculaDetalle