import React from 'react'
import LogoCarrito from './LogoCarrito'
import InfoUsuario from './InfoUsuario'
import useSesionContext from '../../hooks/useSesionContext'
import './Cabecera.css'
import { useNavigate } from 'react-router-dom'

const Cabecera = () => {

	const { sesionIniciada } = useSesionContext();
	const navegar = useNavigate();

	const irAInicio = (e) => {
		e.preventDefault();
		e.target.tagName === "H1" && navegar('/');
		e.target.tagName === "svg" && navegar('/');
	}

	return (
		<>
			<div className="contenedor_cabecera" onClick={((e)=>{irAInicio(e)})}>
				<LogoCarrito size='72' />
				<h1>Mi Compra</h1>
				{sesionIniciada &&
					<InfoUsuario />
				}
			</div>

		</>
	)
}

export default Cabecera