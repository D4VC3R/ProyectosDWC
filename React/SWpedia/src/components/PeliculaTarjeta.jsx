import React from 'react'
import episodio1 from '../assets/imgs/episodio1.jpg';
import episodio2 from '../assets/imgs/episodio2.jpg';
import episodio3 from '../assets/imgs/episodio3.jpg';
import episodio4 from '../assets/imgs/episodio4.webp';
import episodio5 from '../assets/imgs/episodio5.jpg';
import episodio6 from '../assets/imgs/episodio6.jpg';
import { Link } from 'react-router-dom';
import './PeliculaTarjeta.css';

const PeliculaTarjeta = ( {pelicula} ) => {
	let carteles = [
		episodio4,
		episodio5,
		episodio6,
		episodio1,
		episodio2,
		episodio3
	];
	const peliculaID = pelicula.url.split('/').pop();
	return (
		<>
			<div className="peliculas_tarjeta">
				<div className="contenedor_cartel">
					<Link to={`/peliculas/detalles/${peliculaID}`}>
						<img
							src={carteles[peliculaID - 1]}
						></img>
					</Link>
				</div>
				<div className="peliculas_titulo">
					<span >Episode {pelicula.episode_id}:</span>
					<p>{pelicula.title}</p>
				</div>
			</div>
		</>
	)
}

export default PeliculaTarjeta