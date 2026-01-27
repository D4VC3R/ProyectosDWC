import React, { useState } from 'react';
import useProductContext from '../hooks/useProductContext';
import './FiltrarProductos.css';

const FiltrarProductos = () => {
	// Uso nombre como estado inicial para que aparezca ese campo ya marcado, que como el usuario es idiota lo mismo se piensa que no funciona el filtrado...
	const [tipoFiltro, setTipoFiltro] = useState('nombre')
	const [valorFiltro, setValorFiltro] = useState('')
	const { getSameValue, getLessOrEqual, getAllProducts } = useProductContext();

	const manejarForm = (e) => {
		if (e.target.textContent === 'Filtrar') {
			tipoFiltro === 'nombre' && valorFiltro !== '' && getSameValue("nombre", valorFiltro);
			tipoFiltro === 'peso' && valorFiltro !== '' && getLessOrEqual("peso", valorFiltro);
			tipoFiltro === 'precio' && valorFiltro !== '' && getLessOrEqual("precio", valorFiltro);
		}
		e.target.textContent === 'Limpiar filtros' && getAllProducts();
	}

	return (
		<>
			<form className='form-filtrado'onClick={((e) => { manejarForm(e) })}>
				<div>
					<input
						type="text"
						placeholder="Buscar..."
						value={valorFiltro}
						onChange={(e) => setValorFiltro(e.target.value)}
					/>

					<label>
						<input
							type="radio"
							name="tipo-filtro"
							value="nombre"
							checked={tipoFiltro === 'nombre'}
							onChange={(e) => setTipoFiltro(e.target.value)}
						/>
						Nombre
					</label>
					<label>
						<input
							type="radio"
							name="tipo-filtro"
							value="precio"
							checked={tipoFiltro === 'precio'}
							onChange={(e) => setTipoFiltro(e.target.value)}
						/>
						Precio
					</label>
					<label>
						<input
							type="radio"
							name="tipo-filtro"
							value="peso"
							checked={tipoFiltro === 'peso'}
							onChange={(e) => setTipoFiltro(e.target.value)}
						/>
						Peso
					</label>
				</div>
				<div>
					<span>Filtrar</span>
					<span>Limpiar filtros</span>
				</div>
			</form>
		</>
	)
}

export default FiltrarProductos