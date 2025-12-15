import React from 'react'
import { useContext } from 'react'
import { ContextoPeliculas } from '../context/ProveedorPeliculas'
import PeliculaTarjeta from './PeliculaTarjeta'
import { ContextoErrores } from '../context/ProveedorErrores'
import './PeliculaListado.css'

const PeliculaListado = () => {
	const { peliculas } = useContext(ContextoPeliculas);
	const {error} = useContext(ContextoErrores);
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