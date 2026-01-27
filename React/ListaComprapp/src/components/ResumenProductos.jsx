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
		<span>Nº de productos: {listadoProductos.length}</span>
		<span>Precio medio:</span>
		
		</>
	)
}

export default ResumenProductos