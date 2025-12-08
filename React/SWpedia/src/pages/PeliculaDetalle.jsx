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

	// Me duele hacer otra llamada teniendo ya los datos, pero si no, si entras aqui sin pasar por la página de inicio ya te puedes imaginar lo que pasa...
	const traerPelicula = async () => { // Añadir try-catch
		const url = `https://swapi.info/api/films/${id}`;
		const datos = await traerDatos(url);
		setPelicula(datos); 
	}

	const traerPersonajes = async () => { // Añadir try-catch
		const promesas = pelicula.characters.map((urlPersonaje) =>{
			return traerDatos(urlPersonaje);
	});
		const resultados = await Promise.allSettled(promesas);
		setPersonajes(resultados);
	}

	// Al IDE sigue sin gustarle que haga esto, pero quedamos en que era la manera de cargar los datos al montar el componente, ¿no?.
	useEffect(() => {
		traerPelicula();
	}, []);

	// Cargamos los personajes cuando se modifique el estado pelicula, es decir, cuando se carguen las películas.
	useEffect(()=>{
		pelicula.characters && traerPersonajes();
	}, [pelicula]);

	return (
		<>
			<div>
				<Pelicula pelicula={pelicula} />
				<h2>Personajes</h2>
				<div className="peliculasDetalle_personajes">
					{personajes.length > 0
						? personajes.map((personaje) => {
							return <Personaje personaje={personaje} />
						})
						: "Cargando..."}
				</div>
			</div>
		</>
	)
}

export default PeliculaDetalle