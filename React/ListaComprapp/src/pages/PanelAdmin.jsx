import React from 'react'
import ListadoListas from '../components/lists/ListadoListas';
import ListadoProductos from '../components/products/ListadoProductos';
import useListContext from '../hooks/useListContext';
import ListadoUsers from '../components/users/ListadoUsers';
import './PanelAdmin.css';
import { useEffect } from 'react';
import useAdminContext from '../hooks/useAdminContext';

const PanelAdmin = () => {
	// Componente que cambia su contenido en función de la sección que elija el admin. Me apetecía reutilizar componentes para todo lo relacionado con el admin que ya tuviera creado para el usuario corriente.
	// El problema es que al no haberlo diseñado con esta idea desde el principio, algunas cosas me han dado muchos dolores de cabeza.
	
	const { getListas } = useListContext();
	const {vista, verProductos, verUsuarios, verListas} = useAdminContext();

	const manejarClic = async (e) => {
		e.preventDefault();
		e.target.dataset.id === 'productos' && verProductos();
		e.target.dataset.id === 'usuarios' && verUsuarios();
		// Como es posible que el estado listas esté conteniendo solo las vistas de un usuario en concreto, hay que asegurarse de cargarlas todas al entrar en esta sección.
		if (e.target.dataset.id === 'listas') {
			await getListas();
			verListas();
		}
	}
	// Si es la primera vez que entramos al panel, mostramos la vista de usuarios por defecto.
	useEffect(()=>{
		vista === '' && verUsuarios();
	}, []);

	return (
		<>
			<nav className="nav-menu" onClick={((e) => { manejarClic(e) })}>
				<button data-id="usuarios"
					className={vista === 'usuarios' ? 'active' : ''}
				>
					Usuarios
				</button>
				<button data-id="productos"
					className={vista === 'productos' ? 'active' : ''}
				>
					Productos
				</button>
				<button data-id="listas"
					className={vista === 'listas' ? 'active' : ''}
				>
					Listas
				</button>
			</nav>

			<div className="contenido">
				{vista === 'usuarios' && <ListadoUsers />}
				{vista === 'productos' && <ListadoProductos editando={true} />}
				{vista === 'listas' && <ListadoListas />}
			</div>
		</>
	)
}

export default PanelAdmin