import React, {useState, useEffect, createContext, useContext} from 'react'
import { obtenerURLs } from '../libraries/utilidades.js';
import { traerDatos } from '../libraries/asincronismo.js';
import { ContextoErrores } from './ProveedorErrores.jsx';


const ContextoPersonajes = createContext();

const ProveedorPersonajes = ({children}) => {
	const [personajes, setPersonajes] = useState([]);
	const urlsPersonajes = obtenerURLs('people');
	const {addError} = useContext(ContextoErrores);

  const getAllPersonajes = async () => { 
		try {
      const datos = await traerDatos(urlsPersonajes[0]);
      setPersonajes(datos);
		} catch (error) {
			addError(`No se pudo cargar el listado de personajes: ${error.message}`);
		}
  }

	const getPersonajeById = (id) => {
		return personajes.find(personaje => personaje.url.split('/').pop() === id);
	}

	const getPersonajesByPelicula = (urlPelicula) => {
		return personajes.filter(personaje => personaje.films.includes(urlPelicula));
	}

  useEffect(() => {
		getAllPersonajes();
	}, []);


	const exportaciones = {personajes, getPersonajeById, getPersonajesByPelicula}
	return (
		<ContextoPersonajes value={exportaciones}>{children}</ContextoPersonajes>
	)
}

export default ProveedorPersonajes;
export {ContextoPersonajes};