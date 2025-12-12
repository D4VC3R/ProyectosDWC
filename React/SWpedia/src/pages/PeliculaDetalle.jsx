import React from 'react'
import { useParams } from 'react-router-dom'
import { traerDatos } from './../libraries/asincronismo';
import { useState, useEffect } from 'react';
import './PeliculaDetalle.css';
import Pelicula from '../components/Pelicula';
import Personaje from '../components/Personaje';
import { useContext } from 'react';
import { ContextoPeliculas } from '../context/ProveedorPeliculas';

const PeliculaDetalle = () => {

	// Recogemos el id de la URL para traernos la información del endpoint correspondiente.
	const { id } = useParams();
	const [personajes, setPersonajes] = useState([]);


	const traerPersonajes = async () => {
		try {
			const promesas = pelicula.characters.map((urlPersonaje) => {
				return traerDatos(urlPersonaje);
			});
			const resultados = await Promise.allSettled(promesas);
			setPersonajes(resultados);
		} catch (error) {
			setErrores(error);
		}
	}

	// Cargamos los personajes cuando se modifique el estado pelicula, es decir, cuando se carguen las películas.
	useEffect(() => {
		pelicula.characters && traerPersonajes();
	}, [pelicula]);

	return (
		<>
			<div>
				<Pelicula pelicula={pelicula} />
				<h2>Personajes</h2>
				<div className="peliculasDetalle_personajes">
					{personajes.length > 0
						? personajes.slice(0, 10).map((personaje) => {
							return <Personaje personaje={personaje} key={personaje.value.url} />
						})
						: "Cargando..."
					}
				</div>
			</div>
		</>
	)
}

export default PeliculaDetalle