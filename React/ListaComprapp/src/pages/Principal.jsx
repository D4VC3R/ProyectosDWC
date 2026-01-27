import React from 'react'
import './Principal.css'
import { useState } from 'react'
import Listado from './Listado'
import ListadoProductos from './ListadoProductos'


const Principal = () => {

	const [mostrarLista, setMostrarLista] = useState(false);
	const [mostrarProductos, setMostrarProductos] = useState(false);

	const manejarClic = (e) => {
		e.target.textContent === "LISTA DE LA COMPRA" && setMostrarLista(!mostrarLista);
		e.target.textContent === "MOSTRAR PRODUCTOS" && setMostrarProductos(!mostrarProductos);
	}

	return (
		<div className="contenido-principal" onClick={((e)=> manejarClic(e))}>
			<nav>
				<span>LISTA DE LA COMPRA</span>
				<span>MOSTRAR PRODUCTOS</span>
			</nav>

			<div className="contenido-listado">
				{mostrarLista && <Listado />}
			</div>

			<div className="contenido-productos">
				{mostrarProductos && <ListadoProductos />}
			</div>
		</div>
	)
}

export default Principal