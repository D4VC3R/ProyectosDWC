import React from 'react'
import Cabecera from '../components/common/Cabecera'
import listadoPeliculas from './../assets/json/peliculas.json'
import "./Galeria.css";
import FiltrarGaleria from './submenus/filtrarGaleria/FiltrarGaleria';
import { Outlet } from 'react-router-dom';

const Galeria = () => {

	// Obtenemos los carteles de las películas
	const carteles = listadoPeliculas.peliculas.map(pelicula => {
		return pelicula.cartelera;
	});

	return (
		<>
			<FiltrarGaleria />
			<Outlet />
			<h2>Galería de Carteles</h2>
			<div className="galeria_galeria">
				<ul className="galeria_carteles">
					{carteles.map(cartel => {
						return <li>
							<img src={cartel} alt={cartel} className="galeria_cartel" />
						</li>;
					})}
				</ul>
			</div>

		</>
	)
}

export default Galeria