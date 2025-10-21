import React from "react";
import "./App.css";
import Contenedor from "./components/common/Contenedor.jsx";
import Rutas from "./routes/Rutas.jsx";
import Peliculas from "./components/peliculas/Peliculas.jsx";
import { BrowserRouter } from "react-router-dom";


function App() {
	return (
		<>
			<BrowserRouter>
				<Contenedor>
					<Rutas />
				</Contenedor>
			</BrowserRouter>

		</>
	);
}

export default App;
