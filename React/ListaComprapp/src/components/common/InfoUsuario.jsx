import React from 'react'
import useSesionContext from '../../hooks/useSesionContext'
import CerrarSesion from './CerrarSesion'

const InfoUsuario = () => {
	// Componente para mostrar el nombre de usuario en la cabecera si hay sesión y hay nombre de usuario guardado.
	// Desde usuario se podría conseguir el display name pero así me lo traigo ya formateado desde el contexto.
	const { usuario, sesionIniciada, username } = useSesionContext();
	
	return (
		<> {sesionIniciada &&
			<div className="info_usuario">
				<p>Bienvenido{usuario && username && `, ${username}`} </p>
				<CerrarSesion />
			</div>
		}
		</>
	)
}

export default InfoUsuario;