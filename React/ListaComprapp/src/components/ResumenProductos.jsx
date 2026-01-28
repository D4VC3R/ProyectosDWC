import React from 'react'
import useProductContext from '../hooks/useProductContext'

const ResumenProductos = () => {

	const {listadoProductos} = useProductContext();

	const getPrecioMedio = () => {
		if (listadoProductos.length === 0) return 0;
		const total = listadoProductos.reduce((total, producto) => total + producto.precio, 0);
		return total / listadoProductos.length;
	}

	return (
		<>
		<div className="resumen-info">
			<p>Total productos: <span>{listadoProductos.length}</span></p>
			<p>Precio medio: <span>{getPrecioMedio().toFixed(2)}€</span></p>
		</div>
		</>
	)
}

export default ResumenProductos