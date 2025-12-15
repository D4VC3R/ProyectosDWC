import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import './PeliculaDetalle.css';
import Pelicula from '../components/Pelicula';
import PersonajeListado from '../components/PersonajeListado';
import { ContextoPeliculas } from '../context/ProveedorPeliculas';
import { useContext } from 'react';
import { ContextoPersonajes } from '../context/ProveedorPersonajes';

const PeliculaDetalle = () => {
	const {peliculas, getPeliculaById} = useContext(ContextoPeliculas);
	const {getPersonajesByPelicula} = useContext(ContextoPersonajes);
	const { id } = useParams();
	const pelicula = getPeliculaById(id);


	useEffect(() => {
		pelicula.characters && getPersonajesByPelicula(pelicula.url);
	}, [peliculas]);
	return (
		<>
			<div>
				<Pelicula pelicula={pelicula} />
				<h2>Personajes</h2>
				<div className="peliculasDetalle_personajes">
					<PersonajeListado personajes={getPersonajesByPelicula(pelicula.url)} />
				</div>
			</div>
		</>
	)
}

export default PeliculaDetalle