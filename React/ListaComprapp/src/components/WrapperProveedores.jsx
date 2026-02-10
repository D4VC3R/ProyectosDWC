import React from 'react'
import ProveedorProductos from '../context/ProveedorProductos'
import { Outlet } from 'react-router-dom'
import ProveedorListas from '../context/ProveedorListas'

const WrapperProveedores = () => {
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

export default WrapperProveedores