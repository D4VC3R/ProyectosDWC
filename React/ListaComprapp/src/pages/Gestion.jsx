import React from 'react'
import { useNavigate } from 'react-router-dom';
import ListaDetalles from '../components/lists/ListaDetalles';
import ListadoProductos from '../components/products/ListadoProductos';
import FiltrarProductos from '../components/products/FiltrarProductos';
import useListContext from '../hooks/useListContext';
import './Gestion.css';

const Gestion = () => {
	const navegar = useNavigate();
	const { listaActual, limpiarDatosLista } = useListContext();

	const manejarVolver = () => {
		navegar('/principal');
		limpiarDatosLista();
	}


	return (
		<div className="gestion-container">
			<div className="gestion-header">
				<button 
					className="btn-volver" 
					onClick={manejarVolver}
				>
					Ver mis listas
				</button>
			</div>

			<div className="gestion-contenido">
				<div className="seccion-detalle-lista">
					<ListaDetalles />
				</div>

				{listaActual.id && (
					<div className="seccion-agregar-productos">
						<FiltrarProductos />
						<div className="productos-disponibles">
							<ListadoProductos mostrarBotonesAgregar={true} />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Gestion