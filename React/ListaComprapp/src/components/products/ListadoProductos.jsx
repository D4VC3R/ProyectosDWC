import React from 'react'
import { useNavigate } from 'react-router-dom';
import Producto from './Producto';
import useProductContext from '../../hooks/useProductContext'
import useListContext from '../../hooks/useListContext';
import './ListadoProductos.css'
import Cargando from '../common/Cargando';
import Modal from '../common/Modal';

	// Se le pasa un parámetro para cambiar los botones que se muestran en Producto.jsx en función de si nos encontramos en /principal o en /gestion.
const ListadoProductos = ({ mostrarBotonesAgregar = false }) => {

	const navegar = useNavigate();

	// He movido esto a 'components', ya que finalmente no será una página independiente.
	const { 
		listadoProductos, 
		cargando, 
		errorProducto,
		mensajeExito,
		modalOpen,
		abrirModalEliminacion,
		cerrarModalEliminacion,
		confirmarEliminacion,
		cargarProductoParaEditar
	} = useProductContext();

	const { addProducto, mensajeExito: mensajeExitoLista } = useListContext();

	// Recuperamos el id del producto y la acción del botón desde el componente Producto gracias a los data-attributes.
	const manejarClic = async (e) => {
		if (e.target.dataset.action === 'eliminar') {
			const productoId = e.target.dataset.productoId;
			abrirModalEliminacion(productoId); // Solo necesitamos el id para eliminar.
		}
		
		// Si clicamos en editar, nos vamos al formulario y recuperamos los datos del producto.
		// Navego primero para evitar que se vea el retardo de la carga de datos.
		if (e.target.dataset.action === 'editar') {
			navegar('/gestion');
			const productoId = e.target.dataset.productoId;
			await cargarProductoParaEditar(productoId);
		}

		// Si clicamos en agregar, añadimos el producto a la lista actual
		if (e.target.dataset.action === 'agregar') {
			const productoId = e.target.dataset.productoId;
			await addProducto(productoId);
		}
	};

	return (
		<>
			{cargando && <Cargando />}
			{mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
			{errorProducto && <div className="mensaje-error">{errorProducto}</div>}
			<div className='listado-productos' onClick={manejarClic}>
				{listadoProductos.length > 0 ? listadoProductos.map((producto) => {
					return <Producto key={producto.id} producto={producto} mostrarBotonesAgregar={mostrarBotonesAgregar} />
				})
				:<p>Sin resultados.</p>}
			</div>
			{mensajeExitoLista && <div className="mensaje-exito">{mensajeExitoLista}</div>}

			<Modal
				isOpen={modalOpen}
				onClose={cerrarModalEliminacion}
				onConfirm={confirmarEliminacion}
				tipo="borrarProducto"
			/>
		</>
	)
}

export default ListadoProductos