import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react';
import './PersonajeDetalle.css';
import { ContextoPersonajes } from '../context/ProveedorPersonajes';
import VehiculoListado from '../components/VehiculoListado';
import { useState } from 'react';
import Personaje from '../components/Personaje';
import { useEffect } from 'react';


const PersonajeDetalle = () => {
	const { id } = useParams();
	const { personajes, getPersonajeById } = useContext(ContextoPersonajes);
	const [mostrarVehiculos, setMostrarVehiculos] = useState(false);
	const [cargando, setCargando] = useState(true);
	const personaje = cargando ? null : getPersonajeById(id);
	const navegar = useNavigate();

	// Necesitaba repasar el useNavigate y no lo encontré en tu GitHub, he acabado copiando esta solución por su sencillez: 
	// https://stackoverflow.com/questions/65948671/how-to-go-back-to-previous-route-in-react-router-dom-v6
	const volverAtras = () => {
		navegar(-1);
	}

	// Esta vez si, delegación de eventos.
	const controlarClic = (evento) => {
		evento.preventDefault();
		if (evento.target.tagName === 'BUTTON'){
			evento.target.nextSibling.classList.toggle('oculto');
			setMostrarVehiculos(!mostrarVehiculos);
		} 
		if (evento.target.className === 'boton_atras') volverAtras();	
	}

	// Como siempre, nos aseguramos de tener los datos antes de pintarlos.
	useEffect(()=>{
		if (personajes && personajes.length > 0) {
			setCargando(false);
		}
	}, [personajes]);


	return (
		<>
		{cargando ? <p>Cargando...</p> 
		: 
			<div className="contenedor_personajeDetalle" onClick={((evento)=>{controlarClic(evento)})}>
				<span className="boton_atras">← Volver atrás</span>
				<Personaje personaje={personaje} />
				<button>Pilota</button>
				<h2 className="oculto">Vehículos y Naves</h2>
				<div className="vehiculos_personaje">
					{personaje.vehicles.length && personaje.starships.length !== 0 
					? mostrarVehiculos && <VehiculoListado personaje={personaje} />
					: mostrarVehiculos && <p>Este personaje no se ha sacado el carnet todavía.</p>
				}
				</div>
			</div>}

		</>
	)
}

export default PersonajeDetalle