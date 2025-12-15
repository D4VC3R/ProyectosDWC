import React from 'react'
import { Link } from 'react-router-dom'

const Personaje = ({ personaje }) => {
	return (
		<>
			<div  className="peliculasDetalle_personaje">
				<Link to={`/personajes/detalles/${personaje.url.split('/').pop()}`}>
					<span>{personaje.name}</span>
				</Link>
			</div>
		</>
	)
}

export default Personaje