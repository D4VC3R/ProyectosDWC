import React from 'react'
import Vehiculo from './Vehiculo'
import { useContext } from 'react'
import { ContextoErrores } from '../context/ProveedorErrores'
import './PersonajeListado.css'
import { ContextoVehiculos } from '../context/ProveedorVehiculos'
import './VehiculoListado.css'
import { ContextoNaves } from '../context/ProveedorNaves'


const VehiculoListado = ({ personaje }) => {
	const {error} = useContext(ContextoErrores);
	const {getVehiculosByPersonaje} = useContext(ContextoVehiculos);
	const {getNavesByPersonaje} = useContext(ContextoNaves);
	const vehiculos = getVehiculosByPersonaje(personaje.url);
	const naves = getNavesByPersonaje(personaje.url);
	const vehiculosTotales = [...vehiculos, ...naves];

	return (
		<>
			<div className="contenedor_listado_vehiculos">
				{Array.isArray(vehiculosTotales) && vehiculosTotales.length > 0
					? vehiculosTotales.map((vehiculo) => {
						return (
							<Vehiculo key={vehiculo.url} vehiculo={vehiculo} />
						)
					})
					: <div>{error}</div>
				}
			</div>
		</>
	)
}

export default VehiculoListado