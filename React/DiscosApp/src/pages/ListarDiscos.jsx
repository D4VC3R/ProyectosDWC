import React, { useState, useEffect } from 'react'
import { buscarDiscos } from '../libraries/forms'
import useDiscosContext from '../hooks/useDiscosContext.js';
import Disco from '../components/Disco';
import "./ListarDiscos.css"
import Cargando from '../components/common/Cargando.jsx';
import { useNavigate } from 'react-router-dom';

const ListarDiscos = () => {
	const {discos, borrarDisco, cargando} = useDiscosContext();
	const [listado, setListado] = useState([]);
	const [busqueda, setBusqueda] = useState("");
	const resultados = buscarDiscos(listado, busqueda);
	const navegar = useNavigate();

	const limpiar = () => {
		setBusqueda("");
	}

	const manejarClic = async (evento) => {
		const {id, value} = evento.target;
		value === "Limpiar" && limpiar();
		value === "Borrar" && id && await borrarDisco(id);
		value === "Editar" && id && navegar(`/editar/${id}`);
	}
	
	useEffect(() => {
		setListado(discos);
	}, [discos]);



	return (
		<>
		{cargando ? <Cargando /> 
		:
			<div className="container-listarDiscos" onClick={((e)=>{manejarClic(e)})}>
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
									id={disco.id}
								/>
								<input 
								type="button"
								value="Editar"
								className="botonEditar"
								id={disco.id}
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
			</div>}
		</>
	)
}

export default ListarDiscos;