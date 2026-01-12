import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Planetas from '../pages/Planetas'
import Personajes from '../pages/Personajes'
import Error from '../pages/Error'
import PlanetaDetalle from '../pages/PlanetaDetalle'
import Peliculas from '../pages/Peliculas'
import PersonajeDetalle from '../pages/PersonajeDetalle'
import PeliculaDetalle from '../pages/PeliculaDetalle'
import ProveedorPeliculas from '../context/ProveedorPeliculas'
import ProveedorErrores from '../context/ProveedorErrores'
import ProveedorPersonajes from '../context/ProveedorPersonajes'
import ProveedorVehiculos from '../context/ProveedorVehiculos'
import ProveedorNaves from '../context/ProveedorNaves'

const Rutas = () => {
	// Los proveedores más anidados son los más dependientes de los demás.

	return (
		<ProveedorErrores>
			<ProveedorPeliculas>
				<ProveedorPersonajes>
					<ProveedorVehiculos>
						<ProveedorNaves>
						<Routes>
							<Route path="/" element={<Peliculas />} />;
							<Route path="/peliculas/detalles/:id" element={<PeliculaDetalle />} />;
							<Route path="/planetas" element={<Planetas />} />;
							<Route path="/planetas/detalles/:id" element={<PlanetaDetalle />} />;
							<Route path="/personajes" element={<Personajes />} />;
							<Route path="/personajes/detalles/:id" element={<PersonajeDetalle />} />;
							<Route path="*" element={<Error />} />;
						</Routes>
						</ProveedorNaves>
					</ProveedorVehiculos>
				</ProveedorPersonajes>
			</ProveedorPeliculas>
		</ProveedorErrores>
	)
}

export default Rutas