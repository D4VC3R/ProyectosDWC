import React from 'react'
import listadoPeliculas from "./../../assets/json/peliculas.json"
import "./Peliculas.css"
import { Link } from 'react-router-dom';




const Peliculas = () => {

	return (
		<>
			<h2 className="peliculas_titulo">Listado de películas.</h2>
			<div className='peliculas_peliculas'>
				<ul>
					{listadoPeliculas.peliculas.length
						? listadoPeliculas.peliculas.map((pelicula) => {
							return (
								<li key={pelicula.id} className="peliculas_item">
									<img src={pelicula.cartel}
										alt={pelicula.titulo}
										className="peliculas_cartel">
									</img>
									<Link to={`/peliculas/${pelicula.id}`} className="peliculas_titulo">
										{pelicula.titulo}
									</Link>
									<p className="peliculas_anyo">Fecha de estreno: {pelicula.estreno ? pelicula.estreno : "Sin datos."}</p>
								</li>
							);
						})
						: "No hay películas."}
				</ul>
			</div>
		</>
	);
};

export default Peliculas;