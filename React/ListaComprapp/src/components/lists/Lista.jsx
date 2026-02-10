import React from 'react'
import './Lista.css'
import { formatearFecha } from '../../libraries/utilidades.js';

const Lista = ({ lista }) => {
	// Información básica de la lista y botones para ver detalles o eliminar.
	// Los clics se manejan en el componente padre ListadoListas.jsx, desde aquí le pasamos el id de la lista y la acción seleccionada.
	const listaId = lista.id;
	const sinDatos = "Sin datos."


	return (
		<div className="lista" data-lista-id={listaId}>
			<div className="lista-info">
				<span className="lista-nombre">{lista.nombre ? lista.nombre : sinDatos}</span>
				<small className="lista-created_at">{lista.created_at ? formatearFecha(lista.created_at) : sinDatos}</small>
			</div>
			<div className="lista-opciones">
				<span className="btn-eliminar-lista" data-action="eliminar" data-lista-id={listaId} title="Eliminar lista">
					X
				</span>
				<span className="btn-detalles-lista" data-action="detalles" data-lista-id={listaId} title="Detalles lista">
					✎
				</span>
			</div>

		</div>
	)
}

export default Lista