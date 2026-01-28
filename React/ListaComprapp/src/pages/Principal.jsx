import React from 'react'
import './Principal.css'
import { useState } from 'react'
import Listado from './Listado'
import ListadoProductos from './ListadoProductos'
import useSesionContext from '../hooks/useSesionContext'
import FiltrarProductos from '../components/FiltrarProductos';
import ResumenProductos from '../components/ResumenProductos';


const Principal = () => {

	const {sesionIniciada} = useSesionContext();

	const [mostrarLista, setMostrarLista] = useState(false);
	const [mostrarProductos, setMostrarProductos] = useState(false);
	

	const manejarClic = (e) => {
		e.target.textContent === "LISTA DE LA COMPRA" && setMostrarLista(!mostrarLista);
		e.target.textContent === "MOSTRAR PRODUCTOS" && setMostrarProductos(!mostrarProductos);
	}

	return (
		<div className="contenido-principal" onClick={((e)=> manejarClic(e))}>
			<nav className='nav-opciones'>
				{sesionIniciada && <span>LISTA DE LA COMPRA</span>}
				<span>MOSTRAR PRODUCTOS</span>
			</nav>

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