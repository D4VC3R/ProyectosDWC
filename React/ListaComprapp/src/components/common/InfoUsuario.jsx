import React from 'react'
import useSesionContext from '../../hooks/useSesionContext'
import CerrarSesion from './CerrarSesion'

const InfoUsuario = () => {
	const { usuario, sesionIniciada, username } = useSesionContext();

	return (
		<> {sesionIniciada &&
			<div className="info_usuario">
				<p>Bienvenido, {usuario && username} </p>
				<CerrarSesion />
			</div>
		}
		</>
	)
}

export default InfoUsuario;