import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './PeliculaDetalle.css';
import Pelicula from '../components/Pelicula';
import PersonajeListado from '../components/PersonajeListado';
import { ContextoPeliculas } from '../context/ProveedorPeliculas';
import { useContext } from 'react';
import { ContextoPersonajes } from '../context/ProveedorPersonajes';

const PeliculaDetalle = () => {
	const { peliculas, getPeliculaById } = useContext(ContextoPeliculas);
	const { getPersonajesByPelicula } = useContext(ContextoPersonajes);
	const { id } = useParams();
	const [cargando, setCargando] = useState(true);
	const pelicula = cargando ? null : getPeliculaById(id);

	// Con esto nos aseguramos de tener los datos cargados antes de intentar usarlos (pasaría si se recarga la página).
	useEffect(() => {
		if (peliculas && peliculas.length > 0) {
			setCargando(false);
		}
	}, [peliculas]);

	// Recuperamos los personajes de la película, como ya estaban cargados en el contexto no hace falta esperar a nada.
	useEffect(() => {
		pelicula && pelicula.characters && getPersonajesByPelicula(pelicula.url);
	}, [peliculas]);

	return (
		<>
			{cargando ? <p>Cargando...</p>
				:
			<div className="contenedor_peliculaDetalle">
						<Pelicula pelicula={pelicula} />
						<h2>Personajes</h2>
						<div className="peliculasDetalle_personajes">
							<PersonajeListado personajes={getPersonajesByPelicula(pelicula.url)} />
						</div>
			</div>}
		</>
	)
}

export default PeliculaDetalle