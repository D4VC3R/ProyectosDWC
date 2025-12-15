import React from 'react'
import Vehiculo from './Vehiculo'
import { useContext } from 'react'
import { ContextoErrores } from '../context/ProveedorErrores'
import './PersonajeListado.css'
import { ContextoVehiculos } from '../context/ProveedorVehiculos'
import './VehiculoListado.css'


const VehiculoListado = ({ personaje }) => {
	const {error} = useContext(ContextoErrores);
	const {getVehiculosByPersonaje} = useContext(ContextoVehiculos);
	const vehiculos = getVehiculosByPersonaje(personaje.url);

	return (
		<>
			<div className="contenedor_listado_vehiculos">
				{Array.isArray(vehiculos) && vehiculos.length > 0
					? vehiculos.slice(0,10).map((vehiculo) => {
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