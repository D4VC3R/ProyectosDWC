import React from 'react'
import ProveedorProductos from '../context/ProveedorProductos'
import { Outlet } from 'react-router-dom'
import ProveedorListas from '../context/ProveedorListas'

const WrapperProductos = () => {
	return (
		<>
			<ProveedorListas>
			<ProveedorProductos>
				<Outlet />
			</ProveedorProductos>
			</ProveedorListas>
		</>
	)
}

export default WrapperProductos