import React from 'react'
import BotonLogo from './BotonLogo'
import Menu from './Menu'
import './Cabecera.css'

const Cabecera = () => {

	return (
		<>
				<header className='cabecera_cabecera'>
					<div className='cabecera_logo'>
						<BotonLogo />
					</div>
					<div className='cabecera_menu'>
						<Menu />
					</div>
				</header >
		</>
	)
}

export default Cabecera