import React, { useState, useEffect } from 'react'
import { getListadoDiscos, eliminarDisco, guardarListado, buscarDiscos } from '../libraries/forms'
import Disco from '../components/Disco';
import "./listarDiscos.css"

const ListarDiscos = () => {
	const [listado, setListado] = useState([]);
	const [busqueda, setBusqueda] = useState("");
	const [cargado, setCargado] = useState(false);

	const resultados = buscarDiscos(listado, busqueda);

	const eliminar = (id) => {
		const nuevoListado = eliminarDisco(id)
		setListado(nuevoListado);
	}

	const limpiar = () => {
		setBusqueda("");
	}
	// Cuando se monte el componente, cargado será false y no ejecutará guardarListado, solo cuando se actualice al borrar un disco.
	useEffect(() => {
		cargado && guardarListado(listado);
	}, [listado, cargado]);

	// El IDE me dice que estoy loco por usar setListado aquí dentro y que me voy a cargar
	// el rendimiento de la página. Como funciona y no hay nada raro en consola, no le voy a hacer mucho caso.
	useEffect(() => {
		const discosGuardados = getListadoDiscos() || [];
		setListado(discosGuardados);
		setCargado(true);

		return () => {
			// Al desmontar, ponermos cargado a false otra vez.
			setCargado(false)
		}
	}, []);

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
									onClick={() => eliminar(disco.id)}
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