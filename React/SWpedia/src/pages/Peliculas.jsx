import React from 'react'
import './Peliculas.css'
import PeliculaListado from '../components/PeliculaListado';
import { useContext } from 'react';
import { ContextoPeliculas } from '../context/ProveedorPeliculas';
import { useEffect } from 'react';
import { useState } from 'react';

const Peliculas = () => {
	const {peliculas} = useContext(ContextoPeliculas);
	const [cargando, setCargando] = useState(true);

	useEffect(()=>{
		if (peliculas && peliculas.length > 0) {
			setCargando(false);
		}
	}, [peliculas]);

	return (
		<>
			{cargando ? <p>Cargando...</p> 
			:
			<div className="contenedor_peliculas">
				<h2>La Saga</h2>
					<PeliculaListado />
			</div>}

		</>
	)
}

export default Peliculas