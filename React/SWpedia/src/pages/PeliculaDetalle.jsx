import React from 'react'
import { useParams } from 'react-router-dom'
import { traerDatos } from './../libraries/asincronismo';
import { useState, useEffect } from 'react';
import './PeliculaDetalle.css';
import Pelicula from '../components/Pelicula';
import Personaje from '../components/Personaje';

const PeliculaDetalle = () => {

	// Recogemos el id de la URL para traernos la información del endpoint correspondiente.
	const { id } = useParams();
	const [personajes, setPersonajes] = useState([]);
	const [pelicula, setPelicula] = useState({});
	const [errores, setErrores] = useState(null);

	// Me duele hacer otra llamada teniendo ya los datos, pero si no, si entras aqui sin pasar por la página de inicio ya te puedes imaginar lo que pasa...
	const traerPelicula = async () => {
		try {
			const url = `https://swapi.info/api/films/${id}`;
			const datos = await traerDatos(url);
			setPelicula(datos);
		} catch (error) {
			setErrores(error);
		}
	}

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
	// Cargar pelicula al montar el componente.
	useEffect(() => {
		traerPelicula();
	}, []);

	// Cargamos los personajes cuando se modifique el estado pelicula, es decir, cuando se carguen las películas.
	useEffect(() => {
		pelicula.characters && traerPersonajes();
	}, [pelicula]);

	// Esto se convertirá en un componente Error, prometido.
	if (errores) {
		return (
			<div className="error-mensaje">
				<h2>Error</h2>
				<p>{errores}</p>
				<button onClick={() => {
					setErrores(null);
					traerPelicula();
				}}>
					Reintentar
				</button>
			</div>
		);
	}

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