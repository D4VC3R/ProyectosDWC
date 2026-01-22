import React from 'react'
import { Link } from 'react-router-dom'
import useSesionContext from '../hooks/useSesionContext'
import Principal from './Principal';

const Inicio = () => {

	const {sesionIniciada} = useSesionContext();
	return (
		<>
		{!sesionIniciada ?
			<div>
				<p>Inicia sesión para acceder a tus listas de la compra.</p>
				<Link to="/login">Ir a Login</Link>
			</div>
		:
			<Principal />
		}
		</>
	)
}

export default Inicio