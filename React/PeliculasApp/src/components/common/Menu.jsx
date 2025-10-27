import React from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'

const Menu = ({vertical = false}) => {
	// Le paso por props si quiero el menú en vertical u horizontal, así, como dijiste, simplemente cambiando el CSS es como tener un componente diferente.

	return (
		<>
        <nav className={`menu_nav ${vertical ? 'menu_vertical' : ''}`}>
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