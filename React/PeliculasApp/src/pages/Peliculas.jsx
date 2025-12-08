import React from 'react'
import listadoPeliculas from "./../assets/json/peliculas.json"
import "./Peliculas.css"
import { Link } from 'react-router-dom';
import {  } from 'react-router-dom';


const Peliculas = () => {

	return (
		<>
			<div className='peliculas_peliculas'>
				<h2 className="peliculas_titulo">Listado de películas.</h2>
				<ul className="peliculas_lista">
					{listadoPeliculas.peliculas.length
						? listadoPeliculas.peliculas.map((pelicula) => {
							return (
								<li key={pelicula.id} className="peliculas_item">
									<div className="peliculas_imagen">
										<Link to={`/peliculas/detalle/${pelicula.id}`}>
											<img src={pelicula.cartelera}
												alt={pelicula.nombre}
												className="peliculas_cartel"
											>
											</img>
										</Link>
									</div>
									<div className="peliculas_info">
										<Link to={`/peliculas/detalle/${pelicula.id}`}>
											<h3 className="peliculas_nombre">
												{pelicula.nombre}
											</h3>
										</Link>
										<p className="peliculas_anyo">Fecha de estreno: {pelicula.estreno ? pelicula.estreno : "Sin datos."}</p>
									</div>
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