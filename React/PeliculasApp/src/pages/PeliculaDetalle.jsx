import React from 'react'
import {Link, useParams} from 'react-router-dom'
import listadoPeliculas from "./../assets/json/peliculas.json"
import Pelicula from '../components/peliculas/Pelicula';

const PeliculaDetalle = () => {

	// Obtenemos el id de la URL, filtramos ese id con el listado de películas y le pasamos al componente reutilizado 'Pelicula.jsx'
	// una copia del objeto película correspondiente.
	const {id} = useParams();
	const pelicula = listadoPeliculas.peliculas.find(pelicula => pelicula.id === parseInt(id));
	
	return (
		<>
			<Link to="/peliculas">Volver al listado</Link>
			<h2>Detalle de la película</h2>
			<Pelicula {...pelicula} />
		</>
	)
}

export default PeliculaDetalle