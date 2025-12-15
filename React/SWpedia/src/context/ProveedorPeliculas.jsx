import React, {useState, useEffect, createContext} from 'react'
import { obtenerURLs } from '../libraries/utilidades.js';
import { traerDatos } from '../libraries/asincronismo.js';
import episodio1 from '../assets/imgs/episodio1.jpg';
import episodio2 from '../assets/imgs/episodio2.jpg';
import episodio3 from '../assets/imgs/episodio3.jpg';
import episodio4 from '../assets/imgs/episodio4.webp';
import episodio5 from '../assets/imgs/episodio5.jpg';
import episodio6 from '../assets/imgs/episodio6.jpg';
import { useContext } from 'react';
import { ContextoErrores } from './ProveedorErrores.jsx';

const ContextoPeliculas = createContext();

const ProveedorPeliculas = ({children}) => {

	const [peliculas, setPeliculas] = useState([]);
	const {addError} = useContext(ContextoErrores)
	const urlsPeliculas = obtenerURLs('films');
	let carteles = [
		episodio4,
		episodio5,
		episodio6,
		episodio1,
		episodio2,
		episodio3
	];

	// Nos traemos las peliculas y de paso les colocamos ya el cartel correspondiente.
  const traerPeliculas = async () => { 
		try {
      const datos = await traerDatos(urlsPeliculas[0]);
			const peliculasConCartel = datos.map((peli)=>{
				const cartel = carteles[peli.episode_id - 1];
				return {...peli, cartel: cartel};
			})
      setPeliculas(peliculasConCartel);
		} catch (error) {
			addError(`No se pudo cargar el listado de películas: ${error.message}`)
		}
  }

	const getPeliculaById = (id) => {
		return peliculas.find(pelicula => pelicula.url.split('/').pop() === id)
	}

  useEffect(() => {
		traerPeliculas();
	}, []);


	const exportaciones = {peliculas,  getPeliculaById}
	return (
		<ContextoPeliculas value={exportaciones}>{children}</ContextoPeliculas>
	)
}

export default ProveedorPeliculas;
export {ContextoPeliculas};