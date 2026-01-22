import React from 'react'
import useSesionContext from '../../hooks/useSesionContext'

const CerrarSesion = () => {

	const { manejarCierreSesion, sesionIniciada } = useSesionContext();

	const manejarClic = async (e) => {
		e.preventDefault();
		e.target.textContent = "Cerrar Sesión" && await manejarCierreSesion();
	}

	return (
		<>
			{sesionIniciada &&
				<span className='cerrarSesion' onClick={((e) => { manejarClic(e) })}>Cerrar Sesión</span>
			}
		</>
	)
}

export default CerrarSesion