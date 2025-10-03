import React, { useState } from "react";
import "./Listado.css";


const Listado = () => {

	// Creamos un array con números del 1 al 100 como valor inicial.
	const valorInicial = Array.from({ length: 100 }, (valor, indice) => indice + 1);

	const [numerosDisponibles, setNumerosDisponibles] = useState(valorInicial);
	const [numerosGenerados, setNumerosGenerados] = useState([]);

	// Función para extraer un número aleatorio del array numerosDisponibles y agregarlo al de numerosGenerados, que es el que voy a mostrar.
	// De esta manera me aseguro de no repetir ningún número.
	const generarNumeroAleatorio = () => {
		if (numerosDisponibles.length === 0) return;

		const indice = Math.floor(Math.random() * numerosDisponibles.length);
		const numero = numerosDisponibles[indice];

		setNumerosDisponibles(numerosDisponibles.filter((valor, i) => i !== indice));
		setNumerosGenerados([...numerosGenerados, numero]);
	};

	// Para borrar, simplemente volvemos a los valores iniciales de las variables Vegeta.
	const reiniciarEstados = () => {
		setNumerosDisponibles(valorInicial)
		setNumerosGenerados([])
	};

	return (
		<div className="Listado_container">
			<h3>Ejercicio 1</h3>
			<div className="Listado_botones">
				<button onClick={() => generarNumeroAleatorio()}>Generar</button>
				<button onClick={() => reiniciarEstados()}>Eliminar</button>
			</div>
			<div className="Listado_containerNumeros">
				{Array.isArray(numerosGenerados) && numerosGenerados.length
					? numerosGenerados.map((numero, indice) => {
						return (
							<span key = {indice}>
								<ul>
									<li>{numero}</li>
								</ul>
							</span>
						);
					})
					: "No hay números."}
			</div>
		</div>
	);

};
export default Listado;