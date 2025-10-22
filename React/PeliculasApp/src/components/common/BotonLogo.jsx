import React from 'react'
import logo from './../../assets/imgs/movieLogo.png'
import { useNavigate } from 'react-router-dom'

const BotonLogo = () => {
	const navegar = useNavigate();
	
	return (
		<>
			<img src={logo}
			 alt='Logo' 
			 className='boton_logo'
			 onClick={navegar}>
			</img>
		</>
	)
}

export default BotonLogo