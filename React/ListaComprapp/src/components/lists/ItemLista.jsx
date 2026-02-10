import React from 'react'
import useListContext from '../../hooks/useListContext';
import { formatearPeso, formatearPrecio } from '../../libraries/utilidades.js';
import './ItemLista.css';

const ItemLista = ({ item }) => {
	// Recibimos una fila de la tabla 'items_lista' con la cantidad, estado de compra y nombre, precio y peso del producto que contiene.
	const itemId = item.id;
	const producto = item.producto; // El producto que contiene el ítem.
	const sinDatos = "Sin datos.";

	const { rmProducto, updateCantidadProducto, toggleComprado } = useListContext();

	// Delegación de eventos.
	const manejarClic = async (e) => {
		if (e.target.classList.contains('cantidad-btn')) {
			e.target.textContent === '+' && manejarCantidad('sumar');
			e.target.textContent === '-' && manejarCantidad('restar');
		}
		e.target.classList.contains('btn-eliminar-item') && rmProducto(itemId);
	}
	// Aumentar o disminuir la cantidad de un producto.
	const manejarCantidad = async (operacion) => {
		const nuevaCantidad = operacion === 'sumar'
			? item.cantidad + 1
			: item.cantidad - 1;
		await updateCantidadProducto(itemId, nuevaCantidad);
	};

	// Guardamos en una constante el precio y peso total de un ítem.
	const precioTotal = producto?.precio * item.cantidad;
	const pesoTotal = producto?.peso * item.cantidad;

	return (
		<div className={`item-lista ${item.comprado ? 'comprado' : ''}`} data-item-id={itemId} onClick={((e)=>{manejarClic(e)})}>
			<div className="item-checkbox">
				<input
					type="checkbox"
					checked={item.comprado}
					onChange={() => toggleComprado(itemId, item.comprado)}
					title={item.comprado ? "Marcar como no comprado" : "Marcar como comprado"}
				/>
			</div>

			<div className="item-info">
				<h4 className="item-nombre">{producto?.nombre || sinDatos}</h4>
				<div className="item-detalles">
					<span className="item-precio">
						{producto?.precio ? formatearPrecio(producto.precio) : sinDatos}
					</span>
					<span className="item-peso">
						{producto?.peso ? formatearPeso(producto.peso) : sinDatos}
					</span>
				</div>
			</div>

			<div className="item-cantidad">
				<button
					className="cantidad-btn"
					title='Quitar'
					disabled={item.comprado}
				>
					-
				</button>
				<span className="cantidad-valor">{item.cantidad}</span>
				<button
					className="cantidad-btn"
					title="Añadir"
					disabled={item.comprado}
				>
					+
				</button>
			</div>

			<div className="item-totales">
				<span className="total-precio">
					{formatearPrecio(precioTotal)}
				</span>
				<span className="total-peso">
					{formatearPeso(pesoTotal)}
				</span>
			</div>

			<div className="item-acciones">
				<button
					className="btn-eliminar-item"
					title="Eliminar de la lista"
				>
					🗑️
				</button>
			</div>
		</div>
	)
}

export default ItemLista