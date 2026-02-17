import React from 'react'
import { useNavigate } from 'react-router-dom';
import useListContext from '../../hooks/useListContext'
import Lista from './Lista';
import Cargando from '../common/Cargando';
import Modal from '../common/Modal';


const ListadoListas = () => {
	const navegar = useNavigate();
	
	const {
		cargando, 
		listas, 
		modalOpen,
		abrirModalEliminacion,
		cerrarModalEliminacion,
		confirmarEliminacion,
		cargarListaParaMostrar
	} = useListContext();


	// La información de los dataset se recibe desde Lista.jsx.
	const manejarClic = async (e) => {
		if (e.target.dataset.action === 'eliminar') {
			const listaId = e.target.dataset.listaId;
			abrirModalEliminacion(listaId);
		}
		
		// Si clicamos en detalles, nos vamos a la página de gestión y cargamos los datos de la lista que rec.
		if (e.target.dataset.action === 'detalles') {
			const listaId = e.target.dataset.listaId;
			// Navegar después de cargar los datos para evitar que se muestre una lista a la que hayamos accedido previamente.
			await cargarListaParaMostrar(listaId);
			navegar('/gestion');
		}
	};

	return (
		<>
			{cargando && <Cargando />}
			<div className='listado-compra' onClick={manejarClic}>
				{listas.length > 0 ? listas.map((lista) => {
						return <Lista key={lista.id} lista={lista} />
					})
					:<p>Todavía no has creado ninguna lista.</p>}
			</div>

			<Modal
				isOpen={modalOpen}
				onClose={cerrarModalEliminacion}
				onConfirm={confirmarEliminacion}
				tipo="borrarLista"
			/>
		</>
	)
}

export default ListadoListas