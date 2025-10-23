import React from 'react'
import Contenedor from './Contenedor'
import "./Contenido.css";

const Contenido = (props) => {
	return (
		<>
			<div className="contenido_contenido">
				{props.children}
			</div>
		</>
	)
}

export default Contenido