import React from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'

const Menu = ({ vertical = false }) => {
	return (
		<>
			<div className="contenedor_menu">
				<nav className={`menu_nav ${vertical ? 'menu_vertical' : ''}`}>
					<ul className='menu_lista'>
						<Link className='menu_elemento' to='/'>Películas</Link>
						<Link className='menu_elemento' to='/personajes'>Personajes</Link>
						<Link className='menu_elemento' to='/planetas'>Planetas</Link>
					</ul>
				</nav>
			</div>
		</>
	)
}

export default Menu