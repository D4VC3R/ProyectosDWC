import React from 'react'
import useListContext from '../hooks/useListContext'
import Lista from './Lista';

const ListadoListas = () => {
	const {cargando, errorLista, listas, listaActual, getProductosEnLista} = useListContext();

		const manejarClic = async (e) => {
		if (e.target.dataset.action === 'eliminar') {
			const listaId = e.target.dataset.listaId;
			abrirModalEliminacion(listaId); // Solo necesitamos el id para eliminar.
		}
		
		// Si clicamos en mostrar, nos vamos al formulario y recuperamos los datos del lista.
		// Navego primero para evitar que se vea el retardo de la carga de datos.
		if (e.target.dataset.action === 'detalles') {
			navegar('/gestion');
			const listaId = e.target.dataset.listaId;
			await cargarListaParaMostrar(listaId);
		}
	};

	return (
		<div className='listado-compra' onClick={manejarClic}>
			{listas.length > 0 ? listas.map((lista) => {
					return <Lista key={lista.id} lista={lista} />
				})
				:<p>Todavía no has creado ninguna lista.</p>}
		</div>
	)
}

export default ListadoListas