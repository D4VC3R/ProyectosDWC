import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Principal.css'

const Principal = () => {
	// Este componente aún está verde, no le hagas mucho caso.
	return (
		<>
			<div className="menu-opciones">
				<nav>
					<Link to="/principal/listado"><p>LISTA DE LA COMPRA</p></Link>
					<Link to="/principal/productos"><p>MOSTRAR PRODUCTOS DISPONIBLES</p></Link>
				</nav>
			</div>

			<div className="contenido">
				<Outlet />
			</div>
		</>
	)
}

export default Principal