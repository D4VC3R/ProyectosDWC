import React from 'react'
import Producto from './Producto';
import useProductContext from '../hooks/useProductContext'
import './ListadoProductos.css'
import Cargando from './common/Cargando';

const ListadoProductos = () => {

	// He movido esto a 'components', ya que finalmente no será una página independiente.
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