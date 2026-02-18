import React from 'react'
import { useState } from 'react'
import ListadoListas from '../components/lists/ListadoListas';
import ListadoProductos from '../components/products/ListadoProductos';
import useListContext from '../hooks/useListContext';
import ListadoUsers from '../components/users/ListadoUsers';
import './PanelAdmin.css';

const PanelAdmin = () => {
	// Se listarán todos los usuarios en formato tarjeta incluyendo nombre de usuario + lista. Al pinchar la lista, se visualizan los productos y resumen sin opciones de crud.
	const [vista, setVista] = useState('usuarios');
	const { getListas } = useListContext();

	const manejarClic = async (e) => {
		e.preventDefault();
		e.target.dataset.id === 'productos' && setVista('productos');
		e.target.dataset.id === 'usuarios' && setVista('usuarios');
		if (e.target.dataset.id === 'listas') {
			await getListas();
			setVista('listas');
		}
	}

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