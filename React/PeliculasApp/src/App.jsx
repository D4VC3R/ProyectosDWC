import React from "react";
import "./App.css";
import Contenedor from "./components/Ejercicio1/Contenedor.jsx";
import Peliculas from "./components/Practica3.07/Peliculas.jsx";
import "./components/Practica3.07/Peliculas.css";


function App() {
	return (
		<>
			<Contenedor>
				<Peliculas />
			</Contenedor>
		</>
	);
}

export default App;
