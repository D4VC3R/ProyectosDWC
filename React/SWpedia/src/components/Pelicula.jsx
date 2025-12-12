import React from 'react'
import { formatearFecha } from './../libraries/utilidades';

const Pelicula = ({pelicula}) => {
	return (
		<>
			<h1>Episode {pelicula.episode_id}: {pelicula.title}</h1>
				<div className="peliculasDetalle_pelicula">
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