import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ContextoErrores } from '../context/ProveedorErrores'
import './PersonajeListado.css'


const PersonajeListado = ({ personajes }) => {
	const { error } = useContext(ContextoErrores);

	return (
		<>
			<div className="contenedor_personajeListado">
				{Array.isArray(personajes) && personajes.length > 0
					? personajes.slice(0, 10).map((personaje) => {
						return (
							<div key={personaje.url} className="personajeListado">
							<Link to={`/personajes/detalles/${personaje.url.split('/').pop()}`}>
								<span>{personaje.name}</span>
							</Link>
							</div>
						)
					})
					: <div>{error}</div>
				}
			</div>
		</>
	)
}

export default PersonajeListado