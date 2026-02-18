import React from 'react'
import ProveedorAdmin from '../context/ProveedorAdmin'
import { Outlet } from 'react-router-dom'

const WrapperAdmin = () => {
	return (
		<>
			<ProveedorAdmin>
				<Outlet />
			</ProveedorAdmin>
		</>
	)
}

export default WrapperAdmin