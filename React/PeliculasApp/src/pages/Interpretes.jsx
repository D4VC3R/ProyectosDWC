import React from 'react'
import listadoPeliculas from "./../assets/json/peliculas.json"
import Interprete from '../components/peliculas/Interprete';
import "./Interpretes.css"



const Interpretes = () => {

	// Obtenemos los intérpretes de las películas, que se los pasaremos al componente Interprete de prácticas anteriores.
	const interpretes = listadoPeliculas.peliculas.flatMap(pelicula =>{
		return pelicula.actores;
	});

	return (
		<>
			<h2>Listado de intérpretes.</h2>
			<div className="interpretes_listado">
				{interpretes.map((actor, index) =>{
					return <div className="interpretes_ficha"><Interprete key ={index} {...actor} /> </div>
				})}
			</div>
		</>
	)
}

export default Interpretes