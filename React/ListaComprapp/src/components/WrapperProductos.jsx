import React from 'react'
import ProveedorProductos from '../context/ProveedorProductos'
import Principal from '../pages/Principal'

const WrapperProductos = () => {
	return (
		<>
			<ProveedorProductos>
        <Principal />
    </ProveedorProductos>
		</>
	)
}

export default WrapperProductos