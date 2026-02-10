import React from 'react'
import useListContext from '../../hooks/useListContext'
import ItemLista from './ItemLista';
import { formatearFecha, formatearPeso, formatearPrecio } from '../../libraries/utilidades.js';
import './ListaDetalles.css';

const ListaDetalles = () => {
	// Información completa de la lista junto a los productos que contiene.
	const {
		listaActual, 
		items, 
		calcularPesoTotal, 
		calcularPrecioTotal, 
		necesitaCoche
	} = useListContext();

	// Información del resumen de la lista calculada en el proveedor a partir de los productos que contiene. 
	const pesoTotal = calcularPesoTotal();
	const precioTotal = calcularPrecioTotal();
	const cogeElCoche = necesitaCoche();

	return (
		<div className="lista-detalles-container">
					<div className="lista-header">
						<h2>{listaActual.nombre}</h2>
						<small className="fecha-creacion">
							Creada: {formatearFecha(listaActual.created_at)}
						</small>
					</div>

					<div className="lista-resumen">
						<div className="resumen-item">
							<span className="resumen-label">Productos:</span>
							<span className="resumen-valor">{items.length}</span>
						</div>
						<div className="resumen-item">
							<span className="resumen-label">Peso total:</span>
							<span className="resumen-valor">{formatearPeso(pesoTotal)}</span>
						</div>
						<div className="resumen-item">
							<span className="resumen-label">Precio total:</span>
							<span className="resumen-valor precio">{formatearPrecio(precioTotal)}</span>
						</div>
						<div className="resumen-item aviso">
							<span className="resumen-label">Transporte:</span>
							<span className={`resumen-valor ${cogeElCoche ? 'necesita-coche' : 'a-pie'}`}>
								{cogeElCoche ? 'Necesitas el coche' : 'Puedes ir andando'}
							</span>
						</div>
					</div>

					<div className="lista-productos">
						<h3>Productos en la lista</h3>
						{items.length > 0 ? items.map((item) => {
							return <ItemLista key={item.id} item={item} />
						})
						:	<p className="sin-productos">Aún no has añadido productos a esta lista.</p>}
					</div>
		</div>
	)
}

export default ListaDetalles