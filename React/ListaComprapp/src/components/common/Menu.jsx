import React from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'

const Menu = ({vertical = false}) => {

	return (
		<>
		<div className="contenedor_menu">
      <nav className={`menu_nav ${vertical ? 'menu_vertical' : ''}`}>
				<ul className='menu_lista'>
					<Link className='menu_elemento' to='/'>Inicio</Link>
					<Link className='menu_elemento' to='/principal'>Mis Listas</Link>
					<Link className='menu_elemento' to='/creacion'>Añadir Productos</Link>
				</ul>
			</nav>
		</div>
		</>
	)
}

export default Menu