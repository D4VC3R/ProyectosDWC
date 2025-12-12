import React from 'react'
import './Peliculas.css'
import PeliculaTarjeta from '../components/PeliculaTarjeta';
import ProveedorPeliculas from '../context/ProveedorPeliculas';
import PeliculaDetalle from './PeliculaDetalle';
import PeliculaListado from '../components/PeliculaListado';

const Peliculas = () => {
	return (
		<>
			<div className="contenedor_peliculas">
				<ProveedorPeliculas>
					<PeliculaListado />
				</ProveedorPeliculas>
			</div>

		</>
	)
}

export default Peliculas