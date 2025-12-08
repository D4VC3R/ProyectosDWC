import React from 'react'

import { useNavigate } from 'react-router-dom'
import './BotonLogo.css'
import logo from "./../../assets/imgs/swlogo.png"

const BotonLogo = () => {
	const navegar = useNavigate();
	
	return (
		<>
			<img src={logo}
			 alt='Logo' 
			 className='boton_logo'
			 onClick={() => navegar("/")}>
			</img>
		</>
	)
}

export default BotonLogo