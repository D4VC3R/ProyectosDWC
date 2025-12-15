import React from 'react'
import './Peliculas.css'
import PeliculaListado from '../components/PeliculaListado';

const Peliculas = () => {
	return (
		<>
			<div className="contenedor_peliculas">
					<PeliculaListado />
			</div>

		</>
	)
}

export default Peliculas