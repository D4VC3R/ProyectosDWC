import React from 'react'


import './Peliculas.css'
import PeliculaTarjeta from '../components/PeliculaTarjeta';

const Peliculas = ( {peliculas} ) => {
	return (
		<>
			<div className="contenedor_peliculas">
				{peliculas.length > 0
					? peliculas.map((pelicula) => {
						return (
							<PeliculaTarjeta key={pelicula.episode_id} pelicula={pelicula} />
						)
					})
					: "Cargando..."
				}
			</div>

		</>
	)
}

export default Peliculas