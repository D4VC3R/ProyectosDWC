"use strict";

export const listar = (peliculas) => {

}
/**
 * 
 * @param {Array} peliculas 
 */
const getIdentificador = async (peliculas) => {
	
	return peliculas.map((pelicula)=>{
		return pelicula[{episode_id}][{title}]
	})
}