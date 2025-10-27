import React from 'react'
import Cabecera from '../components/common/Cabecera'
import listadoPeliculas from './../assets/json/peliculas.json'
import "./Galeria.css";
import FiltrarGaleria from './submenus/filtrarGaleria/FiltrarGaleria';
import { Outlet } from 'react-router-dom';

const Galeria = () => {

	return (
		<>
			<div className="galeria_galeria">
				<div className="galeria_filtros">
					<FiltrarGaleria />
				</div>
				<h2>Galería de Carteles</h2>
				<div className="galeria_carteles">
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default Galeria