import React from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const Menu = () => {
	return (
		<>
			<nav className='menu_nav'>
				<ul className='menu_lista'>
					<Link className='menu_elemento' to='/'>Inicio</Link>
					<Link className='menu_elemento' to='/contacto'>Contacto</Link>
					<Link className='menu_elemento' to='/acercade'>Acerca de</Link>
					<Link className='menu_elemento' to='/productos'>Productos</Link>
				</ul>
			</nav>
		
		</>
	)
}

export default Menu