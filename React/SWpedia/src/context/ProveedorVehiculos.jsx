import React, {useState, useEffect, createContext} from 'react'
import { obtenerURLs } from '../libraries/utilidades.js';
import { traerDatos } from '../libraries/asincronismo.js';
import { ContextoErrores } from './ProveedorErrores.jsx';
import { useContext } from 'react';


const ContextoVehiculos = createContext();

const ProveedorVehiculos = ({children}) => {
	const [vehiculos, setVehiculos] = useState([]);
	const urlsVehiculos = obtenerURLs('vehicles');
	const {addError} = useContext(ContextoErrores);

	const getAllVehiculos = async () => { 
		try {
			const datos = await traerDatos(urlsVehiculos[0]);
			setVehiculos(datos);
		} catch (error) {
			addError(`No se pudo cargar el listado de vehículos: ${error.message}`);
		}
	}
	const getVehiculoById = (id) => {
		return vehiculos.find(vehiculo => vehiculo.url.split('/').pop() === id);
	}

	const getVehiculosByPelicula = (urlPelicula) => {
		return vehiculos.filter(vehiculo => vehiculo.films.includes(urlPelicula));
	}
	
	const getVehiculosByPersonaje = (urlPersonaje) => {
		return vehiculos.filter(vehiculo => vehiculo.pilots.includes(urlPersonaje));
	}

	useEffect(() => {
		getAllVehiculos();
	}, []);


	const exportaciones = {vehiculos, getVehiculoById, getVehiculosByPelicula, getVehiculosByPersonaje}
	return (
		<ContextoVehiculos value={exportaciones}>{children}</ContextoVehiculos>
	)
}

export default ProveedorVehiculos;
export {ContextoVehiculos};