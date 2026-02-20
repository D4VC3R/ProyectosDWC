import React from 'react'
import useSesionContext from '../../hooks/useSesionContext'
import { useNavigate, useLocation } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
  const { isAdmin } = useSesionContext();
  const navegar = useNavigate();
  // Con location 'leo' la ruta actual para marcar el enlace activo facilmente.
  const location = useLocation();

  // Si hacemos clic en un elemento que contenga el atributo data-link, navegamos a esa ruta.
  const manejarClic = (e) => {
    const link = e.target.getAttribute('data-link')
    if (link) {
      navegar(link);
    }
  }

  return (
    <nav className="menu-navegacion" onClick={manejarClic}>
      <li
        data-link="/principal"
        className={location.pathname === '/principal' ? 'menu-link active' : 'menu-link'}
      >
        Mis Listas
      </li>

      <li
        data-link="/miperfil"
        className={location.pathname === '/miperfil' ? 'menu-link active' : 'menu-link'}
      >
        Mi Perfil
      </li>

      {isAdmin() && (
        <li
          data-link="/admin"
          className={location.pathname === '/admin' ? 'menu-link active' : 'menu-link'}
        >
          Panel Admin
        </li>
      )}
    </nav>
  )
}

export default Menu