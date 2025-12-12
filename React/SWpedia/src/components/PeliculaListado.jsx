import React from 'react'
import { useContext } from 'react'
import { ContextoPeliculas } from '../context/ProveedorPeliculas'
import PeliculaTarjeta from './PeliculaTarjeta'

const PeliculaListado = () => {
	const { peliculas, error } = useContext(ContextoPeliculas);


	return (
		<>
			<div className="contenedor_peliculaListado">
				{Array.isArray(peliculas) && peliculas.length > 0
					? peliculas.map((pelicula) => {
						return (
							<PeliculaTarjeta key={pelicula.episode_id} pelicula={pelicula} />
						)
					})
					: <div>{error}</div>
				}
			</div>
		</>
	)
}

export default PeliculaListado