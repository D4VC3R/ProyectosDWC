import React from 'react'
import LogoCarrito from './LogoCarrito'
import InfoUsuario from './InfoUsuario'
import CerrarSesion from './CerrarSesion'
import Menu from './Menu'
import './Cabecera.css'
import useSesionContext from '../../hooks/useSesionContext'

const Cabecera = () => {

	const { sesionIniciada } = useSesionContext();

	return (
		<header className="cabecera">
			<div className="cabecera-top">
				<LogoCarrito size='50'/>
				{sesionIniciada && <Menu />}
				{sesionIniciada &&
					<div className="cabecera-usuario">
						<InfoUsuario />
					</div>
				}
			</div>
			
		</header>
	)
}

export default Cabecera

