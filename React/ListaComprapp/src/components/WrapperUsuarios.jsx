import React from 'react'
import ProveedorUsuarios from '../context/ProveedorAdmin'
import { Outlet } from 'react-router-dom'

const WrapperUsuarios = () => {
	return (
		<>
			<ProveedorUsuarios>
				<Outlet />
			</ProveedorUsuarios>
		</>
	)
}

export default WrapperUsuarios