import React, { useState, useEffect } from 'react'
import { eliminarDisco, guardarListado, buscarDiscos } from '../libraries/forms'
import useDiscosContext from '../hooks/useDiscosContext.js';
import Disco from '../components/Disco';
import "./ListarDiscos.css"

const ListarDiscos = () => {
	const {discos, cargando, borrarDisco} = useDiscosContext();
	const [listado, setListado] = useState([]);
	const [busqueda, setBusqueda] = useState("");
	const [cargado, setCargado] = useState(false);

	const resultados = buscarDiscos(listado, busqueda);

	const limpiar = () => {
		setBusqueda("");
	}
	
	useEffect(() => {
		cargado && guardarListado(listado);
	}, [listado, cargado]);

	
	useEffect(() => {
		setListado(discos);
		setCargado(true);
	}, [discos]);

	return (
		<>
			<div className="container-listarDiscos">
				<div className="listarDiscos-buscar">
					<input
						type="text"
						name="busqueda"
						value={busqueda}
						className="buscarInput"
						placeholder="Buscar..."
						onChange={(evento) => setBusqueda(evento.target.value)}
					/>
					<input
						type="button"
						value="Limpiar"
						className="botonLimpiar"
						onClick={limpiar}
					/>
				</div>
				<div className="listarDiscos-resultados">
					{resultados.length !== 0 ?
						resultados.map((disco) => (
							<div
								className="listarDiscos-disco"
								key={disco.id}
							>
								<Disco disco={disco} />
								<input
									type="button"
									value="Borrar"
									className="botonBorrar"
									onClick={() => borrarDisco(disco.id)}
								/>
							</div>
						))
						:
						<p>
							{busqueda
								? `No se encontraron discos con "${busqueda}"`
								: "No hay discos guardados."}
						</p>
					}
				</div>
			</div>
		</>
	)
}

export default ListarDiscos;