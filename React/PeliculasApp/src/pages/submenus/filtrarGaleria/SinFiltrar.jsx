import React from 'react'
import listadoPeliculas from './../../../assets/json/peliculas.json'

const SinFiltrar = () => {
		// Obtenemos los carteles de las películas
	const carteles = listadoPeliculas.peliculas.map(pelicula => {
		return pelicula.cartelera;
	});
	return (

			<ul className="galeria_carteles">
				{carteles.map((cartel, index) => {
					return <li key={index}>
						<img src={cartel} alt={cartel} className="galeria_cartel" />
					</li>;
				})}
			</ul>

	)
}

export default SinFiltrar