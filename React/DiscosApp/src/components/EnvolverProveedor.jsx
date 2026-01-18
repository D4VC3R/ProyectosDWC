import React from 'react'
import ProveedorDiscos from '../context/ProveedorDiscos'
import { Outlet } from 'react-router-dom'

const EnvolverProveedor = () => {
	// Hago esto para poder dejar fuera las rutas que no considero necesario que tengan acceso al contexto, como la página de errores.
	// Si envolvía las rutas directamente tenía el problema de que cada componente <Routes> necesitaba su propia dirección ruta base (/), y eso me complicaba las cosas.
	return (
		<ProveedorDiscos>
			<Outlet />
		</ProveedorDiscos>
	)
}

export default EnvolverProveedor