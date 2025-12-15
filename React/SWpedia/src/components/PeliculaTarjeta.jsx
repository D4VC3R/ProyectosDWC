import React from 'react'

import { Link } from 'react-router-dom';
import './PeliculaTarjeta.css';

const PeliculaTarjeta = ({ pelicula }) => {

	const peliculaID = pelicula.url.split('/').pop();
	return (
		<>
			<div className="peliculas_tarjeta">
				<Link to={`/peliculas/detalles/${peliculaID}`}>
					<div className="contenedor_cartel">
						<img
							src={pelicula.cartel}
						></img>
					</div>
					<div className="peliculas_titulo">
						<span>Episode {pelicula.episode_id}:</span>
						<p>{pelicula.title}</p>
					</div>
				</Link>
			</div>
		</>
	)
}

export default PeliculaTarjeta