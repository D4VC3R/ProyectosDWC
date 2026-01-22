import React from 'react'
import useSesionContext from './../hooks/useSesionContext.js'
const Listado = () => {
	const { manejarCierreSesion } = useSesionContext();

	return (
		<div>Listado
			<button type="button" value="cerrar sesión" onClick={((e)=>{e.preventDefault(); manejarCierreSesion()})} />
		</div>
	)
}

export default Listado