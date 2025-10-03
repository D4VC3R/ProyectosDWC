import React from "react";
import "./App.css";
import Contenedor from "./components/Ejercicio1/Contenedor.jsx";
import Listado from "./components/Practica3.08/Listado.jsx";
import ContadorLimite from "./components/Practica3.08/ContadorLimite.jsx";
import ContadorLikes from "./components/Practica3.08/ContadorLikes.jsx";

function App() {
	return (
		<>
			<Contenedor>
				<Listado />
			</Contenedor>

			<Contenedor>
				<ContadorLimite />
			</Contenedor>
			
			<Contenedor>
				<ContadorLikes />
			</Contenedor>
		</>
	);
}

export default App;
