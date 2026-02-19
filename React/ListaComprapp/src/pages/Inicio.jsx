import React from 'react'
import { useNavigate } from 'react-router-dom'
import useSesionContext from '../hooks/useSesionContext'
import './Inicio.css';

const Inicio = () => {
	const navegar = useNavigate();
	const {sesionIniciada, usuario, isAdmin} = useSesionContext();

	// Dependiendo de si ha iniciado sesión, el usuario verá unas cosas u otras.
	return (
			<div>
				{!sesionIniciada ? (
					<>
						<p>Inicia sesión para acceder a tus listas de la compra.</p>
						<span className="boton-inicio" onClick={()=>{navegar('/login')}}>Ir a Login</span>
						<p>O echa un vistazo a nuestros productos.</p>
						<span className="boton-inicio" onClick={()=>{navegar('/principal')}}>Ver Productos</span>
					</>

				) : (
					<>
						<p>Bienvenido de nuevo{usuario.nombre && `, ${usuario.nombre}`}, pulsa el botón para ver tus <span className="boton-inicio" onClick={()=>{navegar('/principal')}}>Listas</span></p>

						{ isAdmin() && <p>Accede al panel de <span className="boton-inicio" onClick={()=>{navegar('/admin')}}>Administración</span></p>}
					</>
				)}
			</div>
	)
}

export default Inicio