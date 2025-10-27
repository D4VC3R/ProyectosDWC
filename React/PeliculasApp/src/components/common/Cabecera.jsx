import React from 'react'
import BotonLogo from './BotonLogo'
import Menu from './Menu'
import './Cabecera.css'

const Cabecera = () => {
	// La cabecera es el conjunto del logo y el menú de navegación.
	return (
		<>
			<header className='cabecera_cabecera'>
				<div className='cabecera_logo'>
					<BotonLogo />
				</div>
				<div className='cabecera_menu'>

				</div>
				<Menu />
			</header>
		</>
	)
}

export default Cabecera