import React from 'react'
import ProveedorUsuarios from '../context/ProveedorUsuarios'
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