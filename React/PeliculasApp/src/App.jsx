import React from "react";
import "./App.css";
import Contenedor from "./components/Ejercicio1/Contenedor.jsx";
import Peliculas from "./components/Practica3.07/Peliculas.jsx";
import "./components/Practica3.07/Peliculas.css";
import Pelicula from "./components/Ejercicio3/Pelicula.jsx";


function App() {
	// Para la próxima práctica cambiaré la estructura de la carpeta components a una más acorde a un proyecto real en lugar de dividirla por prácticas.
	return (
		<>
			<Contenedor>
				<Peliculas />
			</Contenedor>
		</>
	);
}

export default App;
