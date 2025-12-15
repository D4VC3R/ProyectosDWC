import React from 'react'


const Vehiculo = ({ vehiculo }) => {
	console.log(vehiculo);
	return (
		<>
			<div className="vehiculo_detalles">
					<h3>{vehiculo.name}</h3>
					<p><strong>Clase:</strong> {vehiculo.vehicle_class || vehiculo.starship_class}</p>
					<p><strong>Modelo:</strong> {vehiculo.model}</p>
					<p><strong>Fabricante:</strong> {vehiculo.manufacturer}</p>
					<p><strong>Coste en créditos:</strong> {vehiculo.cost_in_credits === "unknown" ? "Desconocido" : vehiculo.cost_in_credits}</p>
			</div>
		</>
	)
}

export default Vehiculo