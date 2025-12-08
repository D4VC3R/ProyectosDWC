import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Planetas from '../pages/Planetas'
import Personajes from '../pages/Personajes'
import Error from '../pages/Error'
import PlanetaDetalle from '../pages/PlanetaDetalle'
import Peliculas from '../pages/Peliculas'
import PersonajeDetalle from '../pages/PersonajeDetalle'
import PeliculaDetalle from '../pages/PeliculaDetalle'

const Rutas = ({peliculas}) => {
	return (
		<Routes>
			<Route path="/" element={<Peliculas peliculas={peliculas} />} />;
			<Route path="/peliculas/detalles/:id" element={<PeliculaDetalle />} />;
			<Route path="/planetas" element={<Planetas />} />;
			<Route path="/planetas/detalles/:id" element={<PlanetaDetalle />} />;
			<Route path="/personajes" element={<Personajes />} />;
			<Route path="/personajes/detalles/:id" element={<PersonajeDetalle />} />;
			<Route path="*" element={<Error />} />;
		</Routes>
	)
}

export default Rutas