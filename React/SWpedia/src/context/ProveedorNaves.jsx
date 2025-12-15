import React, {useState, useEffect, createContext} from 'react'
import { obtenerURLs } from '../libraries/utilidades.js';
import { traerDatos } from '../libraries/asincronismo.js';


const ContextoNaves = createContext();

const ProveedorNaves = ({children}) => {

	const [naves, setNaves] = useState([]);
	const urlsNaves = obtenerURLs('starships');


	const getAllNaves = async () => { 
		try {
			const datos = await traerDatos(urlsNaves[0]);
			setNaves(datos);
		} catch (error) {
			addError(`No se pudo cargar el listado de naves: ${error.message}`);
		}
	}
	const getNaveById = (id) => {
		return naves.find(nave => nave.url.split('/').pop() === id);
	}

	const getNavesByPelicula = (urlPelicula) => {
		return naves.filter(nave => nave.films.includes(urlPelicula));
	}

	const getNavesByPersonaje = (urlPersonaje) => {
		return naves.filter(nave => nave.pilots.includes(urlPersonaje));
	}


	useEffect(() => {
		getAllNaves();
		
	}, []);


	const exportaciones = {naves, getNaveById, getNavesByPelicula, getNavesByPersonaje}
	return (
		<ContextoNaves value={exportaciones}>{children}</ContextoNaves>
	)
}

export default ProveedorNaves;
export {ContextoNaves};