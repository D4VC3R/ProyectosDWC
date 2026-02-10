import React from 'react'
import useListContext from '../../hooks/useListContext'
import BotonAgregar from '../common/BotonAgregar';
import './CrearLista.css';

const CrearLista = () => {

	const {manejarDatosLista, listaActual, createLista, errorLista, mensajeExito} = useListContext();

	const manejarSubmit = async (e) => {
		e.preventDefault();
		await createLista();
	};

	return (
		<div className="crear-lista-container">
			<form onSubmit={manejarSubmit}>
				<label htmlFor="nombre">Ponle título y clica en el botón para empezar una nueva lista.</label>
				{errorLista && <div className="mensaje-error-lista">{errorLista}</div>}
				{mensajeExito && <div className="mensaje-exito-lista">{mensajeExito}</div>}
				<input 
					type="text"
					name="nombre"
					id="nombre"
					value={listaActual.nombre}
					onChange={manejarDatosLista}
					placeholder='Título para la lista.'
				/>
				<div className='form-btn'>
					<BotonAgregar size={24} />
				</div>
			</form>
		</div>
	)
}

export default CrearLista