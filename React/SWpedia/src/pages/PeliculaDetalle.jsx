import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatearFecha } from './../libraries/utilidades';
import { traerDatos } from './../libraries/asincronismo';
import { useState, useEffect } from 'react';
import './PeliculaDetalle.css';

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

	useEffect(() => {
		traerPelicula();
	}, []);

	useEffect(()=>{
		pelicula.characters && traerPersonajes();
	}, [pelicula]);

	// En el futuro esto devolverá un componente <Pelicula> y un map de <Personaje>, lo prometo.
	return (
		<>
			<div>
				<h1>Episode {pelicula.episode_id}: {pelicula.title}</h1>
				<div className="peliculasDetalle_pelicula">
					<p><strong></strong> </p>
					<p><strong>Director:</strong> {pelicula.director}</p>
					<p><strong>Productor:</strong> {pelicula.producer}</p>
					<p><strong>Estreno:</strong> {formatearFecha(pelicula.release_date)}</p>
				</div>

				<div className="sinopsis">
					<h2>Sinopsis</h2>
					<cite>{pelicula.opening_crawl}</cite>
				</div>
				<h2>Personajes</h2>
				<div className="peliculasDetalle_personajes">
					{personajes.length > 0
						? personajes.map((personaje) => {
							return (<div key={personaje.value.url} className="peliculasDetalle_personaje">
								<Link to={`/personajes/detalles/${personaje.value.url.split('/').pop()}`}>
									<span>{personaje.value.name}</span>
								</Link>
							</div>
							)
						})
						: "Cargando..."}
				</div>
			</div>
		</>
	)
}

export default PeliculaDetalle