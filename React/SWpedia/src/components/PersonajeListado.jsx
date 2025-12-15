import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ContextoErrores } from '../context/ProveedorErrores'
import './PersonajeListado.css'


const PersonajeListado = ({ personajes }) => {
	// Los recibe por props porque ya se han filtrado en la página PeliculaDetalle.jsx.
	const { error } = useContext(ContextoErrores);
	const navegar = useNavigate();

	const verDetallesPersonaje = (urlPersonaje) => {
		const idPersonaje = urlPersonaje.split('/').pop();
		navegar(`/personajes/detalles/${idPersonaje}`);
	}

	// Si hacemos clic en un elemento con el atributo data, nos vamos a la página de detalles de ese personaje.
	const manejarClic = (evento) => {
		const urlPersonaje = evento.target.getAttribute('data');

		if (urlPersonaje) verDetallesPersonaje(urlPersonaje);
	}

	return (
		<>
			<div className="contenedor_personajeListado"
			onClick={((evento)=>{manejarClic(evento)})}>

				{Array.isArray(personajes) && personajes.length > 0
					? personajes.slice(0, 10).map((personaje) => {
						return (
							<div key={personaje.url} className="personajeListado" data={personaje.url} >
								<span data={personaje.url}>{personaje.name}</span>
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