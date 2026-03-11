import React from 'react'
import './Principal.css'
import { useState, useEffect } from 'react'
import Listado from '../components/lists/ListadoListas'
import ListadoProductos from '../components/products/ListadoProductos'
import useSesionContext from './../hooks/useSesionContext'
import FiltrarProductos from '../components/products/FiltrarProductos';
import ResumenProductos from '../components/products/ResumenProductos';
import CrearLista from '../components/lists/CrearLista'
import useListContext from '../hooks/useListContext'


const Principal = () => {
	const {sesionIniciada, isAdmin} = useSesionContext();
	const { getListasPropias, limpiarDatosLista} = useListContext();

	// Booleanos para mostrar y ocular sus respectivos componentes.
	const [mostrarLista, setMostrarLista] = useState(true);
	const [mostrarProductos, setMostrarProductos] = useState(true);
	

	const manejarClic = (e) => {
		e.target.tagName === "SPAN" && e.target.textContent.includes("LISTAS") && setMostrarLista(!mostrarLista);
		e.target.tagName === "SPAN" && e.target.textContent.includes("PRODUCTOS") && setMostrarProductos(!mostrarProductos);
	}

	// Lo mismo que en el perfil.
	useEffect(() => {
		limpiarDatosLista();
		sesionIniciada && isAdmin() &&
				getListasPropias();
		}, []);

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
				{sesionIniciada && mostrarLista && <Listado />}
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