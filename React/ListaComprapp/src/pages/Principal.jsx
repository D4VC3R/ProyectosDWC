import React from 'react'
import './Principal.css'
import { useState } from 'react'
import Listado from '../components/ListadoListas'
import ListadoProductos from './../components/ListadoProductos'
import useSesionContext from './../hooks/useSesionContext'
import FiltrarProductos from './../components/FiltrarProductos';
import ResumenProductos from './../components/ResumenProductos';
import CrearLista from '../components/CrearLista'


const Principal = () => {

	const {sesionIniciada} = useSesionContext();

	// Booleanos para mostrar y ocular sus respectivos componentes.
	const [mostrarLista, setMostrarLista] = useState(false);
	const [mostrarProductos, setMostrarProductos] = useState(false);
	

	const manejarClic = (e) => {
		e.target.textContent === "LISTAS DE LA COMPRA" && setMostrarLista(!mostrarLista);
		e.target.textContent === "MOSTRAR PRODUCTOS" && setMostrarProductos(!mostrarProductos);
	}

	return (
		<div className="contenido-principal" onClick={((e)=> manejarClic(e))}>
			<nav className='nav-opciones'>
				{sesionIniciada && <span>LISTAS DE LA COMPRA</span>}
				<span>MOSTRAR PRODUCTOS</span>
			</nav>

			<div className='crear-lista'>
				{<CrearLista />}
			</div>

			<div className="contenido-listado">
				{mostrarLista && <Listado />}
			</div>

			{mostrarProductos && 
			<div className='filtros-productos'>
				{sesionIniciada && <FiltrarProductos />}
				<ResumenProductos />
			</div>}

			<div className="contenido-productos">
				{mostrarProductos && <ListadoProductos />}
			</div>
		</div>
	)
}

export default Principal