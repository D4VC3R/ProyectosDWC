import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductContext from '../hooks/useProductContext';
import Cargando from './common/Cargando';
import './CrearProducto.css';

const CrearProducto = () => {
	const { 
		createProduct, 
		manejarDatosProducto, 
		datosProducto, 
		cargando, 
		errorProducto, 
		mensajeExito,
		modoEdicion,
		limpiarDatosProducto
	} = useProductContext();
	
	const [mensaje, setMensaje] = useState('');
	const navegar = useNavigate();

	const manejarSubmit = async (e) => {
		e.preventDefault();
		setMensaje('');

		try {
			await createProduct();
			navegar('/principal');
		} catch (error) {
			setMensaje(error.message);
		}
	};

	const handleCancelar = () => {
		limpiarDatosProducto();
		setMensaje('');
		navegar('/principal');
	};

	return (
		<div className="crear-producto-container">
			<h2>{modoEdicion ? 'Editar Producto' : 'Añadir Producto'}</h2>
			<form className="crear-producto-form" onSubmit={manejarSubmit}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre *</label>
					<input
						type="text"
						name="nombre"
						value={datosProducto.nombre}
						onChange={manejarDatosProducto}
						placeholder="Nombre del producto"
						disabled={cargando}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="descripcion">Descripción</label>
					<textarea
						name="descripcion"
						value={datosProducto.descripcion}
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
						value={datosProducto.precio}
						onChange={manejarDatosProducto}
						placeholder="0.00"
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
						value={datosProducto.peso}
						onChange={manejarDatosProducto}
						placeholder="0.00"
						step="0.01"
						min="0"
						disabled={cargando}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="imagen">URL de la Imagen</label>
					<input
						type="url"
						name="imagen"
						value={datosProducto.imagen}
						onChange={manejarDatosProducto}
						placeholder="https://ejemplo.com/imagen.jpg"
						disabled={cargando}
					/>
				</div>

				<div className="form-buttons">
					<button type="submit" className="btn-crear" disabled={cargando}>
						{cargando ? (modoEdicion ? 'Actualizando...' : 'Creando...') : (modoEdicion ? 'Actualizar Producto' : 'Crear Producto')}
					</button>
					
					{modoEdicion && (
						<button type="button" className="btn-cancelar" onClick={handleCancelar} disabled={cargando}>
							Cancelar
						</button>
					)}
				</div>

				{cargando && <Cargando />}
				
				{mensajeExito && (
					<p className="mensaje mensaje-exito">
						{mensajeExito}
					</p>
				)}
				
				{mensaje && (
					<p className={`mensaje ${mensaje.includes('correctamente') ? 'mensaje-exito' : 'mensaje-error'}`}>
						{mensaje}
					</p>
				)}
				
				{errorProducto && !mensaje && (
					<p className="mensaje mensaje-error">{errorProducto}</p>
				)}
			</form>
		</div>
	);
};

export default CrearProducto;
