import React from 'react'
import './Lista.css'

const Lista = ({ lista }) => {
	const listaId = lista.id;
	const sinDatos = "Sin datos."

	return (
		<div className="lista" data-lista-id={listaId}>
			<div className="lista-info">
				<h3 className="lista-nombre">{lista.nombre ? lista.nombre : sinDatos}</h3>
				<p className="lista-created_at">{lista.created_at ? lista.created_at : sinDatos}</p>
			</div>
			<div className="lista-opciones">
				<span className="btn-eliminar" data-action="eliminar" data-lista-id={listaId} title="Eliminar lista">
					X
				</span>
				<span className="btn-detalles" data-action="detalles" data-lista-id={listaId} title="Detalles lista">
					✎
				</span>
			</div>

		</div>
	)
}

export default Lista