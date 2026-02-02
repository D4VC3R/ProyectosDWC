import React, { useState, useEffect } from 'react';
import useProductContext from '../hooks/useProductContext';
import './FiltrarProductos.css';

const FiltrarProductos = () => {
	// Uso nombre como estado inicial para que aparezca ese campo ya marcado, que como el usuario es idiota lo mismo se piensa que no funciona el filtrado...
	const [tipoFiltro, setTipoFiltro] = useState('nombre');
	const [valorFiltro, setValorFiltro] = useState('');
	// Tres estados para manejar el ordenado de productos... algo me dice que se podría hacer más eficientemente.
	const [ordenAsc, setOrdenAsc] = useState(true);
	const [ordenado, setOrdenado] = useState(false);
	const [columnaOrdenada, setColumnaOrdenada] = useState(null);

	const { getSameValue, getLessOrEqual, getAllProducts, sortProducts } = useProductContext();

	// Filtrado en tiempo real utilizando la base de datos en lugar de filtrar el estado.
	useEffect(() => {
		if (valorFiltro === '') {
			getAllProducts();
			return;
		}

		tipoFiltro === 'nombre' && valorFiltro !== '' && getSameValue("nombre", valorFiltro);
		tipoFiltro === 'peso' && !isNaN(valorFiltro) && getLessOrEqual("peso", valorFiltro);
		tipoFiltro === 'precio' && !isNaN(valorFiltro) && getLessOrEqual("precio", valorFiltro);
	}, [valorFiltro]);

	// Si se cambia el tipo de filtro, reseteo el estado 'ordenado' y el input del filtro.
	// Así si el usuario cambia de nombre a precio, no se queda el input con un valor que no tiene sentido.
	const cambiarFiltro = (e) => {
		setTipoFiltro(e.target.value);
		// Si ya estaba filtrado, lo limpio al cambiar de tipo de filtro.
		if (valorFiltro !== '') {
			getAllProducts();
			setValorFiltro('');
		}
		if (columnaOrdenada !== null && columnaOrdenada !== tipoFiltro) {
			setOrdenado(false);
		}
	}

	const resetFiltros = () => {
		getAllProducts();
		setOrdenado(false);
		setColumnaOrdenada(null);
		setValorFiltro('');
	}

	// Si se pulsa el botón de ordenar y no es la misma columna, ordeno ascendente por defecto.
	// Si es la misma columna, invierto el orden.
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

	// No hago preventDefault aquí para no cargarme la funcionalidad de los botones radio.
	// Lo hago en el onSubmit del formulario que me da el mismo resultado y me resulta más cómodo.
	const manejarForm = (e) => {
		e.target.classList.contains('btn-ordenar') && manejarOrden();
		e.target.textContent === 'Limpiar filtros' && resetFiltros();
	}

	return (
		<>
			<form className='form-filtrado'
				onClick={((e) => { manejarForm(e) })}
				onSubmit={e => e.preventDefault()}>
				<div>
					<input
						type="text"
						placeholder="Filtrar..."
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
					<span className="btn-ordenar">Ordenar{ordenado && columnaOrdenada === tipoFiltro && (ordenAsc ? "↑" : "↓")}</span>
					<span>Limpiar filtros</span>
				</div>
			</form>
		</>
	)
}

export default FiltrarProductos