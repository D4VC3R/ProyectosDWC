import React from "react";
import "./App.css";
import Contenedor from "./components/Ejercicio1/Contenedor.jsx";
import Peliculas from "./components/Practica3.07/Peliculas.jsx";
import "./components/Practica3.07/Peliculas.css";
import Pelicula from "./components/Ejercicio3/Pelicula.jsx";


function App() {
	return (
		<>
			<Contenedor>
				<Peliculas />
			</Contenedor>
			<Contenedor>
				<Pelicula nombre = "el sexto sentido" director = "Yo" cartelera = "https://www.ecartelera.com/carteles/5400/5409/001.jpg">
					</Pelicula>
			</Contenedor>

		</>
	);
}

export default App;
