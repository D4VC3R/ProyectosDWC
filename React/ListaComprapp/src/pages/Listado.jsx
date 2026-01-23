import React from 'react'
import useSesionContext from '../hooks/useSesionContext'

const Listado = () => {
	const {} = useSesionContext();
	
	return (
		<div><p>Aquí se mostrará la lista de la compra.</p></div>
	)
}

export default Listado