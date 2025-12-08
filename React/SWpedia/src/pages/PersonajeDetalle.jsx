import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { traerDatos } from '../libraries/asincronismo';
import './PersonajeDetalle.css';


const PersonajeDetalle = () => {
	const { id } = useParams();
	const [personaje, setPersonaje] = useState({});

	const traerPersonaje = async () => {
		try {
			const url = `https://swapi.info/api/people/${id}`;
			const datos = await traerDatos(url);
			setPersonaje(datos);
		} catch (error) {
			console.error('Error al cargar personaje:', error);
		}
	}

		useEffect(() => {
		traerPersonaje();
	}, []);


			return (
				<div className="contenedor_personaje">
					<h1>{personaje.name}</h1>
					<div className="info_personaje">
						<p><strong>Altura:</strong> {personaje.height} cm</p>
						<p><strong>Peso:</strong> {personaje.mass} kg</p>
						<p><strong>Color de pelo:</strong> {personaje.hair_color}</p>
						<p><strong>Color de piel:</strong> {personaje.skin_color}</p>
						<p><strong>Color de ojos:</strong> {personaje.eye_color}</p>
						<p><strong>Año de nacimiento:</strong> {personaje.birth_year}</p>
						<p><strong>Género:</strong> {personaje.gender}</p>
					</div>
				</div>
			)
		}

		export default PersonajeDetalle