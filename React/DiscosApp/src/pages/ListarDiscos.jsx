import React from 'react'
import { getListadoDiscos } from '../libraries/forms'
import Disco from '../components/Disco';

const ListarDiscos = () => {
	const listado = getListadoDiscos();
	console.log(listado);


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
								<input type="button" value="Borrar"/>
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