import React from 'react'
import Producto from '../components/Producto';
import useProductContext from '../hooks/useProductContext'
import './ListadoProductos.css'

const ListadoProductos = () => {

	const {listadoProductos} = useProductContext();

    return (
        <div className='listado-productos'>
            {listadoProductos && listadoProductos.map((producto)=>{
                return <Producto key={producto.id} producto={producto} />
            })}
        </div>
    )
}

export default ListadoProductos