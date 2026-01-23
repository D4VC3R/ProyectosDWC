import React from 'react'
import { useNavigate } from 'react-router-dom'
import useSesionContext from '../hooks/useSesionContext'
import './Inicio.css';

const Inicio = () => {
	const navegar = useNavigate();
	const {sesionIniciada, username} = useSesionContext();

	// Dependiendo de si ha iniciado sesión, el usuario verá unas cosas u otras.
	return (
			<div>
				{!sesionIniciada ? (
					<>
						<p>Inicia sesión para acceder a tus listas de la compra.</p>
						<span className="boton-inicio" onClick={()=>{navegar('/login')}}>Ir a Login</span>
					</>

				) : (
					<>
						<p>Bienvenido de nuevo{username && `, ${username}`}, pulsa el botón para iniciar una lista de la compra.</p>
						<span className="boton-inicio" onClick={()=>{navegar('/principal')}}>Comenzar</span>
					</>
				)}
			</div>
	)
}

export default Inicio