import React from 'react'
import ProveedorProductos from '../context/ProveedorProductos'
import { Outlet } from 'react-router-dom'

const WrapperProductos = () => {
	return (
		<>
			<ProveedorProductos>
				<Outlet />
			</ProveedorProductos>
		</>
	)
}

export default WrapperProductos