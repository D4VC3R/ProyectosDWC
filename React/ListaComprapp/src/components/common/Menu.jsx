import React from 'react'
import { NavLink } from 'react-router-dom'
import useSesionContext from '../../hooks/useSesionContext'
import './Menu.css'

const Menu = () => {
    const { isAdmin} = useSesionContext()

    return (
        <nav className="menu-navegacion">
            <NavLink 
                to="/principal" 
                className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
            >
                Mis Listas
            </NavLink>

            <NavLink 
                to="/miperfil" 
                className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
            >
                Mi Perfil
            </NavLink>

            {isAdmin() && (
                <>
                    <NavLink 
                        to="/admin" 
                        className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                    >
                        Panel Admin
                    </NavLink>

                    <NavLink 
                        to="/admin/creacion" 
                        className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                    >
                        Crear Producto
                    </NavLink>
                </>
            )}
        </nav>
    )
}

export default Menu