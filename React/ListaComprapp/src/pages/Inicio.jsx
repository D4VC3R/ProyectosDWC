import React from 'react'
import { Link } from 'react-router-dom'

const Inicio = () => {
	return (
		<>
			<div>Página de inicio, inicia sesión para acceder a tus listas de compra</div>
			<Link to="/login">Ir a Login</Link>
		</>
	)
}

export default Inicio