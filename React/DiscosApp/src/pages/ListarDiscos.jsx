import React, { useState, useEffect } from 'react'
import { getListadoDiscos, eliminarDisco, guardarListado } from '../libraries/forms'
import Disco from '../components/Disco';

const ListarDiscos = () => {
	const [listado, setListado] = useState(getListadoDiscos() || []);
	
	const eliminar = (id) => {
		const nuevoListado = eliminarDisco(id);
		setListado(nuevoListado);
	}
	// Falta hacer que al salir de la pagina, guarde el listado sin los discos borrados.



	return (
		<>
			<div className="container-listarDiscos">
				<div className="listarDiscos-buscar">
					<input 
					type="text"
					name="busqueda"/>
					<input type="button" value="Buscar"></input>
					<input type="button" value="Limpiar"></input>
				</div>
				<div className="listarDiscos-resultados">
					<div className="listarDiscos-listado">
						{listado.length !== 0 ?
						listado.map((disco)=>{
							return (
								<div 
								className="listarDiscos-disco" 
								key={disco.id}>
								<Disco disco={disco}/>
								<input type="button" value="Borrar" onClick={() => eliminar(disco.id)} />
								</div>
							)
						})
					:"No hay discos guardados."}
					</div>

				</div>
			</div>
		</>
	)
}

export default ListarDiscos