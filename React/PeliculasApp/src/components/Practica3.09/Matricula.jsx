import React from 'react';
import { useState } from 'react';
import matriculados from './matriculados.json';
import "./Matricula.css";

const Matricula = () => {

	const valorInicial = matriculados.discentes;
	const valorInicialCabecera = "Alumnos matriculados:"

	const [discentes, setDiscentes] = useState(valorInicial);

	// Booleano útil para alternar entre orden ascendente o descendente.
	const [orden, setOrden] = useState(true);
	// Un poquito de presentación.
	const [cabecera, setCabecera] = useState(valorInicialCabecera);

	const reiniciarListado = () => {
		setDiscentes(valorInicial);
		setCabecera(valorInicialCabecera);
	};

	// Uso el valorInicial y no discentes para filtrar, de manera que no filtremos lo ya filtrado. Qué lío.
	const mostrar2DAW = () => {
		setDiscentes(valorInicial.filter((discente) => discente.curso === "2DAW"));
		setCabecera("Alumnos de 2º DAW:")
	};

	const mostrarPrimeros = () => {
		setDiscentes(valorInicial.filter((discente) => discente.curso.includes("1")));
		setCabecera("Alumnos de primer año:")
	};

	const mostrarDAW = () => {
		setDiscentes(valorInicial.filter((discente) => discente.curso.includes("DAW")));
		setCabecera("Alumnos de DAW (1º y 2º):")
	};

	// A partir de aqui voy a filtrar discentes porque considero que interesa más aplicar estos filtros sobre 
	// lo que ya tengamos filtrado que sobre el valor inicial del array.
	const mostrarLectores = () => {
		setDiscentes(discentes.filter((discente) => discente.aficiones.includes("lectura")));
		setCabecera(cabecera.replace("Alumnos", "Alumnos lectores"));
	};

	// Como sort() modifica el array original, creamos primero una copia y después, ordenamos por apellido.
	const ordenarListado = () => {
		const ordenados = [...discentes];
		setDiscentes(ordenados.sort((a, b) => {
			if (orden) {
				return a.apellidos.localeCompare(b.apellidos);
			} else {
				return b.apellidos.localeCompare(a.apellidos);
			}
		}));
		setDiscentes(ordenados);
		setOrden(!orden);
	};

	// Para desmatricular, devolvemos un array con todos los discentes menos el del ID seleccionado.
	const desmatricular = (id) => {
		setDiscentes(discentes.filter((discente) => discente.id !== id));
	};

	return (
		<div>
			<h2>Matrículas</h2>
			<div className="Matricula_botones">
				<button onClick={() => mostrar2DAW()}>Mostrar 2ºDAW</button>
				<button onClick={() => mostrarPrimeros()}>Mostrar 1º</button>
				<button onClick={() => mostrarDAW()}>Mostrar DAW</button>
				<button onClick={() => mostrarLectores()}>Mostrar lectores</button>
				<button onClick={() => ordenarListado()}>Ordenar listado</button>
				<button onClick={() => reiniciarListado()}>Reiniciar listado</button>
			</div>
			<h2>{cabecera}</h2>
			<div className="Matricula_listado">
				<ul>
					{Array.isArray(discentes) && discentes.length 
					? discentes.map((discente, indice) => (
						<li
							key={crypto.randomUUID()}
							id={indice}>
							{`${discente.nombre}  ${discente.apellidos}.`}
							<button className="Matricula_desmatricular" onClick={() => desmatricular(discente.id)}>Desmatricular</button>
						</li>))
						: "No hay alumnos." }
				</ul>
			</div>
		</div>
	)
}

export default Matricula