import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './BotonInicio.css'

const BotonInicio = () => {

	const navegar = useNavigate();
	// Aparece en la página de error 404 para volver a inicio.
	return (
			<button 
			className='boton_inicio' 
			onClick={() => navegar("/")}
			>
				Volver a Inicio
			</button>
	)
}

export default BotonInicio