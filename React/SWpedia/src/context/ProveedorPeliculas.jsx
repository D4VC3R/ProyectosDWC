import React, {useState, useEffect, createContext} from 'react'
import { obtenerURLs } from '../libraries/utilidades.js';
import { traerDatos } from '../libraries/asincronismo.js';

const ContextoPeliculas = createContext();

const ProveedorPeliculas = ({children}) => {

	const [peliculas, setPeliculas] = useState([]);
	const [error, setError] = useState("");
	const urlsPeliculas = obtenerURLs('films');

  const traerPeliculas = async () => { 
		try {
      const datos = await traerDatos(urlsPeliculas[0]);
      setPeliculas(datos);
		} catch (error) {
			setError(`No se pudo cargar el listado de películas: ${error.message}`)
		}
  }

  useEffect(() => {
		traerPeliculas();

	}, []);


	const exportaciones = {peliculas, error}
	return (
		<ContextoPeliculas value={exportaciones}>{children}</ContextoPeliculas>
	)
}

export default ProveedorPeliculas;
export {ContextoPeliculas};