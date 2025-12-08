import React from 'react'

import { useNavigate } from 'react-router-dom'
import './BotonLogo.css'

const BotonLogo = () => {
	const navegar = useNavigate();
	
	return (
		<>
			<img src={"not"}
			 alt='Logo' 
			 className='boton_logo'
			 onClick={() => navegar("/")}>
			</img>
		</>
	)
}

export default BotonLogo