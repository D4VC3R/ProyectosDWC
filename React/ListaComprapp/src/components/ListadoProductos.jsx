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

	// Delegación de eventos: un solo manejador para todos los botones
	const handleClickListado = async (e) => {
		// Verificar si se hizo clic en el botón de eliminar
		if (e.target.dataset.action === 'eliminar') {
			const productoId = e.target.dataset.productoId;
			abrirModalEliminacion(productoId);
		}
		
		// Verificar si se hizo clic en el botón de editar
		if (e.target.dataset.action === 'editar') {
			const productoId = e.target.dataset.productoId;
			await cargarProductoParaEditar(productoId);
			navegar('/gestion');
		}
	};

	return (
		<>
			{cargando && <Cargando />}
			{mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
			{errorProducto && <div className="mensaje-error">{errorProducto}</div>}
			<div className='listado-productos' onClick={handleClickListado}>
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