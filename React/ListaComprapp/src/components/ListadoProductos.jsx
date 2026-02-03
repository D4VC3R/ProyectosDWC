import React from 'react'
import { useNavigate } from 'react-router-dom';
import Producto from './Producto';
import useProductContext from '../hooks/useProductContext'
import './ListadoProductos.css'
import Cargando from './common/Cargando';
import Modal from './common/Modal';

const ListadoProductos = () => {

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

	// Recuperamos el id del producto y la acción del botón desde el componente Producto gracias a los data-attributes.
	const manejarClic = async (e) => {
		
		if (e.target.dataset.action === 'eliminar') {
			const productoId = e.target.dataset.productoId;
			abrirModalEliminacion(productoId);
		}
		
		// Si clicamos en editar, nos vamos al formulario y recuperamos los datos del producto.
		// Navego primero para evitar que se vea el retardo de la carga de datos.
		if (e.target.dataset.action === 'editar') {
			navegar('/gestion');
			const productoId = e.target.dataset.productoId;
			await cargarProductoParaEditar(productoId);
		}
	};

	return (
		<>
			{cargando && <Cargando />}
			{mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
			{errorProducto && <div className="mensaje-error">{errorProducto}</div>}
			<div className='listado-productos' onClick={manejarClic}>
				{listadoProductos.length > 0 ? listadoProductos.map((producto) => {
					return <Producto key={producto.id} producto={producto} />
				})
				:<p>Sin resultados.</p>}
			</div>

			<Modal
				isOpen={modalOpen}
				onClose={cerrarModalEliminacion}
				onConfirm={confirmarEliminacion}
				title="Confirmar eliminación"
				message="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
				confirmText="Eliminar"
				cancelText="Cancelar"
			/>
		</>
	)
}

export default ListadoProductos