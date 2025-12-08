import React from 'react'
import episodio1 from '../assets/imgs/episodio1.jpg';
import episodio2 from '../assets/imgs/episodio2.jpg';
import episodio3 from '../assets/imgs/episodio3.jpg';
import episodio4 from '../assets/imgs/episodio4.webp';
import episodio5 from '../assets/imgs/episodio5.jpg';
import episodio6 from '../assets/imgs/episodio6.jpg';
import { Link } from 'react-router-dom';
import './Peliculas.css'

const Peliculas = ( {peliculas} ) => {
	// Recibimos por props el listado de películas y mostramos su cartel y título a modo de 'menú principal' para empezar a navegar.
	let carteles = [
		episodio4,
		episodio5,
		episodio6,
		episodio1,
		episodio2,
		episodio3
	];

	// Haciendo esta práctica me ha surgido la duda de si es posible utilizar <Link> con delegación de eventos, si me acuerdo te preguntaré en clase.
	return (
		<>
			<div className="contenedor_peliculas">
				{peliculas.length > 0
					? peliculas.map((pelicula, indice) => {
						return (
							<div key={pelicula.episode_id} className="peliculas_tarjeta">
								<div className="contenedor_cartel">
									<Link to={`/peliculas/detalles/${indice+1}`}>
									<img
										src={carteles[indice]}
									></img>
									</Link>
								</div>
								<div className="peliculas_titulo">
								<span >Episode {pelicula.episode_id}:</span>
								<p>{pelicula.title}</p>
								</div>
							</div>
						)
					})
					: "Cargando..."
				}
			</div>

		</>
	)
}

export default Peliculas