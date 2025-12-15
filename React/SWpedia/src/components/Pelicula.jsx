import React from 'react'
import { formatearFecha } from './../libraries/utilidades';
import './Pelicula.css';

const Pelicula = ({pelicula}) => {
	return (
		<>
				<div className="peliculasDetalle_pelicula">
					<img src={pelicula.cartel} alt={`Cartel de ${pelicula.title}`}></img>
					<h1>Episode {pelicula.episode_id}: {pelicula.title}</h1>
					<p><strong>Director:</strong> {pelicula.director}</p>
					<p><strong>Productor:</strong> {pelicula.producer}</p>
					<p><strong>Estreno:</strong> {formatearFecha(pelicula.release_date)}</p>
				</div>

				<div className="sinopsis">
					<h2>Sinopsis</h2>
					<cite>{pelicula.opening_crawl}</cite>
				</div>
		</>
	)
}

export default Pelicula