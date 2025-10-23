import React from 'react'
import listadoPeliculas from "./../assets/json/peliculas.json"
import "./Peliculas.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Peliculas = () => {
	const navegar = useNavigate();
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
											<img src={pelicula.cartelera}
											alt={pelicula.nombre}
											className="peliculas_cartel"
											onClick={() => navegar(`/peliculas/${pelicula.id}`)}>
										</img>
									</div>
									<div className="peliculas_info">
										<Link to={`/peliculas/${pelicula.id}`} className="peliculas_nombre">
											{pelicula.nombre}
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