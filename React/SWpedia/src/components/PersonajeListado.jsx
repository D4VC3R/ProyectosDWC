import React from 'react'
import Personaje from './Personaje'
import { useContext } from 'react'
import { ContextoErrores } from '../context/ProveedorErrores'
import './PersonajeListado.css'


const PersonajeListado = ({ personajes }) => {
	const {error} = useContext(ContextoErrores);

	return (
		<>
			<div className="contenedor_personajeListado">
				{Array.isArray(personajes) && personajes.length > 0
					? personajes.slice(0,10).map((personaje) => {
						return (
							<Personaje key={personaje.url} personaje={personaje} />
						)
					})
					: <div>{error}</div>
				}
			</div>
		</>
	)
}

export default PersonajeListado