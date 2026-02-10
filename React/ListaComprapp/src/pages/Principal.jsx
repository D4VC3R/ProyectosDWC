import React from 'react'
import './Principal.css'
import { useState } from 'react'
import Listado from '../components/lists/ListadoListas'
import ListadoProductos from '../components/products/ListadoProductos'
import useSesionContext from './../hooks/useSesionContext'
import FiltrarProductos from '../components/products/FiltrarProductos';
import ResumenProductos from '../components/products/ResumenProductos';
import CrearLista from '../components/lists/CrearLista'


const Principal = () => {

	const {sesionIniciada} = useSesionContext();

	// Booleanos para mostrar y ocular sus respectivos componentes.
	const [mostrarLista, setMostrarLista] = useState(true);
	const [mostrarProductos, setMostrarProductos] = useState(false);
	

	const manejarClic = (e) => {
		e.target.tagName === "SPAN" && e.target.textContent.includes("LISTAS") && setMostrarLista(!mostrarLista);
		e.target.tagName === "SPAN" && e.target.textContent.includes("PRODUCTOS") && setMostrarProductos(!mostrarProductos);
	}

	return (
		<div className="contenido-principal" onClick={((e)=> manejarClic(e))}>
			<nav className='nav-opciones'>
				{sesionIniciada && <span>{mostrarLista ? "OCULTAR LISTAS" : "MOSTRAR LISTAS"}</span>}
				<span>{mostrarProductos ? "OCULTAR PRODUCTOS" : "MOSTRAR PRODUCTOS"}</span>
			</nav>

			<div className='crear-lista'>
				{sesionIniciada && <CrearLista />}
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