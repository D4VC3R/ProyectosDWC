import React from 'react'
import Producto from '../components/Producto';
import useProductContext from '../hooks/useProductContext'
import useSesionContext from '../hooks/useSesionContext'
import './ListadoProductos.css'
import Cargando from './../components/common/Cargando';
import FiltrarProductos from '../components/FiltrarProductos';


const ListadoProductos = () => {

	const { listadoProductos, cargando } = useProductContext();
	const {sesionIniciada} = useSesionContext();

	return (
		<>
			{cargando && <Cargando />}
			{sesionIniciada && <FiltrarProductos />}
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