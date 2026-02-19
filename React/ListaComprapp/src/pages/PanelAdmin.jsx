import React from 'react'
import ListadoListas from '../components/lists/ListadoListas';
import ListadoProductos from '../components/products/ListadoProductos';
import useListContext from '../hooks/useListContext';
import ListadoUsers from '../components/users/ListadoUsers';
import './PanelAdmin.css';
import { useEffect } from 'react';
import useAdminContext from '../hooks/useAdminContext';

const PanelAdmin = () => {
	// Se listarán todos los usuarios en formato tarjeta incluyendo nombre de usuario + lista. Al pinchar la lista, se visualizan los productos y resumen sin opciones de crud.
	
	const { getListas } = useListContext();
	const {vista, verProductos, verUsuarios, verListas} = useAdminContext();

	const manejarClic = async (e) => {
		e.preventDefault();
		e.target.dataset.id === 'productos' && verProductos();
		e.target.dataset.id === 'usuarios' && verUsuarios();
		if (e.target.dataset.id === 'listas') {
			await getListas();
			verListas();
		}
	}

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