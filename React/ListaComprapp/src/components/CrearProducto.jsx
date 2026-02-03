import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProductContext from '../hooks/useProductContext';
import Cargando from './common/Cargando';
import './CrearProducto.css';

const CrearProducto = () => {
	const {
		createProduct,
		updateProduct,
		manejarDatosProducto,
		producto,
		cargando,
		errorProducto,
		mensajeExito,
		modoEdicion,
		limpiarDatosProducto
	} = useProductContext();

	const navegar = useNavigate();

	const manejarClick = async (e) => {
		e.preventDefault();
		e.target.textContent === 'Crear Producto' && await createProduct()
		e.target.textContent === 'Actualizar Producto' && await updateProduct() && setTimeout(() => navegar('/principal'), 2000); 
		e.target.textContent === 'Cancelar' && manejarCancelar();

	};

	const manejarCancelar = () => {
		limpiarDatosProducto();
		navegar('/principal');
	};
	// Como el formulario es practicamente igual para crear que para editar, utilizamos el booleano 'modoEdicion' para cambiar el texto de la cabecera y del botón.
	// Si estamos en modo edición, también se añade un botón para cancelar y volver a la página principal sin guardar cambios.
	// Los inputs y botones no están disponibles mientras cargando sea true. 

	return (
		<div className="crear-producto-container">
			<h2>{modoEdicion ? 'Editar Producto' : 'Añadir Producto'}</h2>
			<form className="crear-producto-form" onClick={manejarClick}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre *</label>
					<input
						type="text"
						name="nombre"
						id="nombre"
						value={producto.nombre}
						onChange={manejarDatosProducto}
						placeholder="Nombre del producto"
						disabled={cargando}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="descripcion">Descripción</label>
					<textarea
						name="descripcion"
						id="descripcion"
						value={producto.descripcion}
						onChange={manejarDatosProducto}
						placeholder="Descripción del producto"
						rows="4"
						disabled={cargando}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="precio">Precio (€) *</label>
					<input
						type="number"
						name="precio"
						id="precio"
						value={producto.precio}
						onChange={manejarDatosProducto}
						placeholder="0,00"
						step="0.01"
						min="0"
						disabled={cargando}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="peso">Peso (kg) *</label>
					<input
						type="number"
						name="peso"
						id="peso"
						value={producto.peso}
						onChange={manejarDatosProducto}
						placeholder="0,00"
						step="0.01"
						min="0"
						disabled={cargando}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="imagen">URL de la imagen</label>
					<input
						type="url"
						name="imagen"
						id="imagen"
						value={producto.imagen}
						onChange={manejarDatosProducto}
						placeholder="https://ejemplo.com/imagen.jpg"
						disabled={cargando}
					/>
				</div>

				<div className="form-buttons">
					<span className="btn-crear" disabled={cargando}>
						{cargando ? 'Dame un segundo...' : (modoEdicion ? 'Actualizar Producto' : 'Crear Producto')}
					</span>

					{modoEdicion && 
						<span className="btn-cancelar" disabled={cargando}>Cancelar</span>}
				</div>

				{cargando && <Cargando />}
				{mensajeExito && <p className="mensaje mensaje-exito">{mensajeExito}</p>}
				{errorProducto && <p className="mensaje mensaje-error">{errorProducto}</p>
				}
			</form>
		</div>
	);
};

export default CrearProducto;
