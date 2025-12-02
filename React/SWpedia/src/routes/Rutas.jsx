import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Planetas from '../pages/Planetas'
import Personajes from '../pages/Personajes'
import Error from '../pages/Error'
import PlanetaDetalle from '../pages/PlanetaDetalle'

const Rutas = () => {
	return (
		<Routes>
			<Route path="/" element={<Inicio />} />;
			<Route path="/planetas" element={<Planetas />} />;
			<Route path="/planetas/detalle/:id" element={<PlanetaDetalle />} />;
			<Route path="/personajes" element={<Personajes />} />;
			<Route path="/personajes/detalle/:id" element={<PersonajeDetalle />} />;
			<Route path="*" element={<Error />} />;
		</Routes>
	)
}

export default Rutas