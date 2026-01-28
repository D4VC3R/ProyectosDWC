import React from 'react'
import Producto from '../components/Producto';
import useProductContext from '../hooks/useProductContext'
import './ListadoProductos.css'
import Cargando from './../components/common/Cargando';



const ListadoProductos = () => {

	// Tengo que mover esto a 'components', ya que finalmente no será una página independiente.
	const { listadoProductos, cargando } = useProductContext();

	return (
		<>
			{cargando && <Cargando />}
			<div className='listado-productos'>
				{listadoProductos.length > 0 ? listadoProductos.map((producto) => {
					return <Producto key={producto.id} producto={producto} />
				})
				:<p>Sin resultados.</p>}
			</div>

		</>
	)
}

export default ListadoProductos