import React from 'react'
import useListContext from '../hooks/useListContext'
import ItemLista from './ItemLista';

const ListaDetalles = () => {

	const {items} = useListContext();

	return (
		<>
		<div className="lista-detalles">
			{items.length > 0 ? items.map((item) =>{
				return <ItemLista key={item.id} item={item} />
			})
			:	<p>Aún no has añadido nada a esta lista.</p>}
			</div>
		</>
		)
}

export default ListaDetalles