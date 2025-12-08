import React from 'react'
import { Link } from 'react-router-dom'

const Personaje = ({ personaje }) => {
	return (
		<>
			<div key={personaje.value.url} className="peliculasDetalle_personaje">
				<Link to={`/personajes/detalles/${personaje.value.url.split('/').pop()}`}>
					<span>{personaje.value.name}</span>
				</Link>
			</div>
		</>
	)
}

export default Personaje