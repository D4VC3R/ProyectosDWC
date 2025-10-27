import React from 'react'
import listadoPeliculas from "./../assets/json/peliculas.json"
import "./Peliculas.css"
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Peliculas = () => {
	const navegar = useNavigate();

	// Como he anidado las rutas, necesito una función para moverme a la parte donde se renderiza <Outlet />, si no parece que no pase nada al clickar una película.
	// Podría usar un Link, y luego en PeliculaDetalle implementar un botón para volver atrás, pero así me ha gustado más.
	const clickPelicula = (id) => {
		window.scrollTo(0, 0);
		navegar(`/peliculas/${id}`);
	}

	return (
		<>
		<Outlet />
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
											onClick={() => clickPelicula(pelicula.id)}>
										</img>
									</div>
									<div className="peliculas_info">
										<h3 className="peliculas_nombre" onClick={() => clickPelicula(pelicula.id)}>
											{pelicula.nombre}
										</h3>
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