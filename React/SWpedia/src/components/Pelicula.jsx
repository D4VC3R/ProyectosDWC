import React from 'react'
import { formatearFecha } from './../libraries/utilidades';
import './Pelicula.css';

const Pelicula = ({ pelicula }) => {
	// Componente que hace de ficha detallada de una película.
	return (
		<>
			<div className="contenedor_peliculaDetalle">
				<h1>Episode {pelicula.episode_id}: {pelicula.title}</h1>
				<div className="peliculaDetalle_pelicula">
					<img src={pelicula.cartel} alt={`Cartel de ${pelicula.title}`}></img>
					<div className="peliculaDetalle_info">
						<p><strong>Director:</strong> {pelicula.director}</p>
						<p><strong>Productor:</strong> {pelicula.producer}</p>
						<p><strong>Estreno:</strong> {formatearFecha(pelicula.release_date)}</p>
						<h2>Sinopsis</h2>
						<cite>{pelicula.opening_crawl}</cite>
					</div>
				</div>
			</div>
		</>
	)
}

export default Pelicula