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
					<Link className='menu_elemento' to='/peliculas'>Películas</Link>
					<Link className='menu_elemento' to='/interpretes'>Intérpretes</Link>
					<Link className='menu_elemento' to='/galeria'>Galería</Link>
					<Link className='menu_elemento' to='/acercade'>Acerca de</Link>
				</ul>
			</nav>
		
		</>
	)
}

export default Menu