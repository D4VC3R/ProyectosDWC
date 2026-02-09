import React from 'react'
import useListContext from '../hooks/useListContext'

const Listado = () => {
	const {getListas, getLista, createLista, rmLista, manejarDatosLista, listas, listaActual, getProductosEnLista} = useListContext();


	return (
		<div className='listado-compra'>
			<button onClick={getListas}></button>
			{listas.length > 0 ? listas.map((lista) => {
					return lista.nombre;
				})
				:<p>Sin resultados.</p>}
				<button onClick={getProductosEnLista}></button>
		</div>
	)
}

export default Listado