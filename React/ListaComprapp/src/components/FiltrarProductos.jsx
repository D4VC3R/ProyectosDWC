import React, { useState, useEffect } from 'react';
import useProductContext from '../hooks/useProductContext';
import './FiltrarProductos.css';

const FiltrarProductos = () => {
	// Uso nombre como estado inicial para que aparezca ese campo ya marcado, que como el usuario es idiota lo mismo se piensa que no funciona el filtrado...
	const [tipoFiltro, setTipoFiltro] = useState('nombre');
	const [valorFiltro, setValorFiltro] = useState('');
	// Tres estados para saber si está ordenado, en qué orden y por qué columna.
	const [ordenAsc, setOrdenAsc] = useState(true);
	const [ordenado, setOrdenado] = useState(false);
	const [columnaOrdenada, setColumnaOrdenada] = useState(null);

	const { getSameValue, getLessOrEqual, getAllProducts, sortProducts } = useProductContext();

	// Filtrado en tiempo real utilizando la base de datos en lugar de filtrar el estado.
	// Como depende del valor del input, si no esta vacío el campo, filtramos.
	// El if sirve para evitar que, si se cambia a un campo númerico, no intente filtrar recibiendo un string vacío.
	useEffect(() => {
		if (valorFiltro !== '') {
			tipoFiltro === 'nombre'  && getSameValue("nombre", valorFiltro);
			tipoFiltro === 'peso' && !isNaN(valorFiltro) && getLessOrEqual("peso", valorFiltro);
			tipoFiltro === 'precio' && !isNaN(valorFiltro) && getLessOrEqual("precio", valorFiltro);
		}
	}, [valorFiltro]);

	// Si se cambia el tipo de filtro, reseteo el estado 'ordenado' y el input del filtro.
	// Así si el usuario cambia de nombre a precio, no se queda el input con un valor que no tiene sentido.
	const cambiarFiltro = (e) => {
		// Si ya estaba filtrado, limpiamos el campo y recuperamos todos los productos.
		if (valorFiltro !== '') {
			setValorFiltro('');
			getAllProducts();
		}
		setTipoFiltro(e.target.value);
		// Si estaba ordenado por otra columna o no estaba ordenado, reseteamos el estado.
		if (columnaOrdenada !== null && columnaOrdenada !== tipoFiltro) {
			setOrdenado(false);
		}
	}

	// Resetear todo.
	const resetFiltros = () => {
		getAllProducts();
		setOrdenado(false);
		setColumnaOrdenada(null);
		setValorFiltro('');
	}


	const manejarOrden = () => {
		// Si no estaba ordenado o se cambia de columna, ordenamos ascendente.
		if (columnaOrdenada !== tipoFiltro) {
			setColumnaOrdenada(tipoFiltro); // Que columna está ordenada.
			setOrdenAsc(true); // Indicamos hemos ordenado de manera ascendente.
			setOrdenado(true); // Indicamos que ya está ordenado.
			sortProducts(tipoFiltro, true); // Ordenamos ascendente.
		} else {
			// Si ya estaba ordenado en esa misma columna, invertimos el orden.
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