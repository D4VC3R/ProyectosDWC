import React from 'react'
import BotonInicio from '../components/common/BotonInicio.jsx'
import "./Error.css"

const Error = () => {
	return (
		<>
		<div className="error_container">
			<h1>¡Ups! Parece que te has perdido...</h1>
			<img className="error_imagen" src="https://i.pinimg.com/originals/4a/06/ef/4a06efb5a2f39feaa2f81b9f3d179a94.gif"></img>
			<BotonInicio />
		</div>

		</>
	)
}

export default Error