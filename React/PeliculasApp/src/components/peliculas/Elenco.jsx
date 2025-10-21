import React from 'react'
import { generarUuidAleatorio } from '../../libraries/misFunciones.js';
import Interprete from './Interprete.jsx';
import "./Elenco.css"

const Elenco = (props) => {
	let noInfo = "Sin datos."
	

	return (
		<div className="elenco_container">
			<h2 className="elenco_titulo">Reparto</h2>
			{props.actores && props.actores.length > 0
				? props.actores.map((actor) => (
					<Interprete
						key={generarUuidAleatorio()}
						nombre={actor.nombre ? actor.nombre : noInfo}
						fechaNacimiento={actor.fechaNacimiento ? actor.fechaNacimiento : noInfo}
						imagen={actor.imagen ? actor.imagen : noInfo}
						biografia={actor.biografia ? actor.biografia : noInfo}
					/>
				))
				: <div className="elenco_no_info">{noInfo}</div>
			}
		</div>
	)
}

export default Elenco