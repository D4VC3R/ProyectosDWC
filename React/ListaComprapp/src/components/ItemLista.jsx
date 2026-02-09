import React from 'react'

const ItemLista = ({item}) => {
	const itemId= item.id;
	const sinDatos = "Sin datos.";
	
	return (
		<div className="item" data-item-id={itemId}>
			<div className="item-info">
				<h3 className="item-nombre">{item.nombre ? item.nombre : sinDatos}</h3>
				<p className="item-created_at">{item.created_at ? item.created_at : sinDatos}</p>
			</div>
			<div className="item-opciones">
				<span className="btn-eliminar" data-action="eliminar" data-item-id={itemId} title="Eliminar item">
					X
				</span>
				<span className="btn-detalles" data-action="detalles" data-item-id={itemId} title="Detalles item">
					✎
				</span>
			</div>

		</div>
	)
}

export default ItemLista