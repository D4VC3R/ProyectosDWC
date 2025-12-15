import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import './PersonajeDetalle.css';
import { ContextoPersonajes } from '../context/ProveedorPersonajes';
import VehiculoListado from '../components/VehiculoListado';
import { useState } from 'react';


const PersonajeDetalle = () => {
	const { id } = useParams();
	const { getPersonajeById } = useContext(ContextoPersonajes);
	const [mostrarVehiculos, setMostrarVehiculos] = useState(false);
	const personaje = getPersonajeById(id);

	const toggleVehiculos = () => {
		setMostrarVehiculos(!mostrarVehiculos);
	}

	return (
		<>
			<div className="contenedor_personaje">
				<h1>{personaje.name}</h1>
				<h2>Datos Personales</h2>
				<div className="info_personaje">
					<p><strong>Altura:</strong> {personaje.height} cm</p>
					<p><strong>Peso:</strong> {personaje.mass} kg</p>
					<p><strong>Color de pelo:</strong> {personaje.hair_color}</p>
					<p><strong>Color de piel:</strong> {personaje.skin_color}</p>
					<p><strong>Color de ojos:</strong> {personaje.eye_color}</p>
					<p><strong>Año de nacimiento:</strong> {personaje.birth_year}</p>
					<p><strong>Género:</strong> {personaje.gender}</p>
					<button onClick={()=>{toggleVehiculos()}}>Pilota</button>
				</div>
				<h2>Vehículos y Naves</h2>
				<div className="vehiculos_personaje">
					{personaje.vehicles.length && personaje.starships.length !== 0 
					? mostrarVehiculos && <VehiculoListado personaje={personaje} />
					: mostrarVehiculos && <p>Este personaje no se ha sacado el carnet todavía.</p>
				}
				</div>
			</div>

		</>
	)
}

export default PersonajeDetalle