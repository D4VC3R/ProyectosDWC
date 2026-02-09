import React from 'react'
import useListContext from '../hooks/useListContext'
import BotonAgregar from './common/BotonAgregar';
import './CrearLista.css';

const CrearLista = () => {

	const {manejarDatosLista, listaActual} = useListContext();

	return (
		<div className="crear-lista-container">
			<form>
				<label htmlFor="nombre">Ponle título y clica en el botón para empezar una nueva lista.</label>
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