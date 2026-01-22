import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Principal = () => {
	return (
		<>
			<div>
				<nav>
					<Link to="/listado"><p>Mi carrito de la compra</p></Link>
					<Link to="/productos"><p>Productos disponibles</p></Link>
				</nav>
			</div>

			<div className="contenido">
				<Outlet />
			</div>
		</>
	)
}

export default Principal