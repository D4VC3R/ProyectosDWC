import React from 'react'
import LogoCarrito from './LogoCarrito'
import InfoUsuario from './InfoUsuario'
import useSesionContext from '../../hooks/useSesionContext'
import './Cabecera.css'

const Cabecera = () => {

	const { sesionIniciada } = useSesionContext();

	return (
		<>
			<div className="contenedor_cabecera">
				<LogoCarrito size='72' />
				<h1>Lista de la compra</h1>
				{sesionIniciada &&
					<InfoUsuario />
				}
			</div>

		</>
	)
}

export default Cabecera