import React, { useState } from 'react';
import useProductContext from '../hooks/useProductContext';
import './FiltrarProductos.css';

const FiltrarProductos = () => {
	// Uso nombre como estado inicial para que aparezca ese campo ya marcado, que como el usuario es idiota lo mismo se piensa que no funciona el filtrado...
	const [tipoFiltro, setTipoFiltro] = useState('nombre');
	const [valorFiltro, setValorFiltro] = useState('');
	const [ordenAsc, setOrdenAsc] = useState(true);
	const [ordenado, setOrdenado] = useState(false);
	const [columnaOrdenada, setColumnaOrdenada] = useState(null);
	const { getSameValue, getLessOrEqual, getAllProducts, sortProducts } = useProductContext();

	const cambiarFiltro = (e) => {
		setTipoFiltro(e.target.value);
		if (columnaOrdenada !== null && columnaOrdenada !== tipoFiltro) {
			setOrdenado(false);
		}
	}

	const resetFiltros = () => {
		getAllProducts();
		setOrdenado(false);
		setColumnaOrdenada(null);
		setValorFiltro('')
	}

	const manejarOrden = () => {
		if (columnaOrdenada !== tipoFiltro) {
			setColumnaOrdenada(tipoFiltro);
			setOrdenAsc(true);
			setOrdenado(true);
			sortProducts(tipoFiltro, true);
		} else {
			const nuevoOrden = !ordenAsc;
			setOrdenAsc(nuevoOrden);
			sortProducts(tipoFiltro, nuevoOrden);
		}
	}
	const manejarFiltrar = () => {
		tipoFiltro === 'nombre' && valorFiltro !== '' && getSameValue("nombre", valorFiltro);
		tipoFiltro === 'peso' && !isNaN(valorFiltro) && getLessOrEqual("peso", valorFiltro);
		tipoFiltro === 'precio' && !isNaN(valorFiltro) && getLessOrEqual("precio", valorFiltro);
	}

	const manejarForm = (e) => {
		e.target.textContent === 'Filtrar' && manejarFiltrar();
		e.target.classList.contains('btn-ordenar') && manejarOrden();
		e.target.textContent === 'Limpiar filtros' && resetFiltros();
	}


	return (
		<>
			<form className='form-filtrado' onClick={((e) => { manejarForm(e) })}>
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
							onChange={(e) => cambiarFiltro(e)}
						/>
						Nombre
					</label>
					<label>
						<input
							type="radio"
							name="tipo-filtro"
							value="precio"
							checked={tipoFiltro === 'precio'}
							onChange={(e) => cambiarFiltro(e)}
						/>
						Precio
					</label>
					<label>
						<input
							type="radio"
							name="tipo-filtro"
							value="peso"
							checked={tipoFiltro === 'peso'}
							onChange={(e) => cambiarFiltro(e)}
						/>
						Peso
					</label>
				</div>
				<div>
					<span>Filtrar</span>
					<span className="btn-ordenar">Ordenar{ordenado && columnaOrdenada === tipoFiltro && (ordenAsc ? "↑" : "↓")}</span>
					<span>Limpiar filtros</span>
				</div>
			</form>
		</>
	)
}

export default FiltrarProductos