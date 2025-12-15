import React from 'react'
import { Link } from 'react-router-dom'
import './Personaje.css';

const Personaje = ({ personaje }) => {
	return (
		<>
			<div className="contenedor_personaje">
				<h1>{personaje.name}</h1>
				<h2>Datos Personales</h2>
				<div className="personaje_info">
					<p><strong>Altura:</strong> {personaje.height} cm</p>
					<p><strong>Peso:</strong> {personaje.mass} kg</p>
					<p><strong>Color de pelo:</strong> {personaje.hair_color}</p>
					<p><strong>Color de piel:</strong> {personaje.skin_color}</p>
					<p><strong>Color de ojos:</strong> {personaje.eye_color}</p>
					<p><strong>Año de nacimiento:</strong> {personaje.birth_year}</p>
					<p><strong>Género:</strong> {personaje.gender}</p>
				</div>
			</div>
		</>
	)
}

export default Personaje