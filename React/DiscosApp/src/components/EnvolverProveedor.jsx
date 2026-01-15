import React from 'react'
import ProveedorDiscos from '../context/ProveedorDiscos'
import { Outlet } from 'react-router-dom'

const EnvolverProveedor = () => {
	return (
		<ProveedorDiscos>
			<Outlet />
		</ProveedorDiscos>
	)
}

export default EnvolverProveedor