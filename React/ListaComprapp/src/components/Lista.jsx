import React from 'react'
import './Lista.css'

const Lista = ({ lista }) => {
	const listaId = lista.id;
	const sinDatos = "Sin datos."

	const formatearFecha = (fecha) => {
		const date = new Date(fecha);
		const options = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		};
		const localeString = date.toLocaleString('es-ES', options);

		return localeString.replace(',', ' a las');
	}

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