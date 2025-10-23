import React from "react";
import "./App.css";
import Contenedor from "./components/common/Contenedor.jsx";
import Rutas from "./routes/Rutas.jsx";
import { BrowserRouter } from "react-router-dom";
import Cabecera from "./components/common/Cabecera.jsx";
import Footer from "./components/common/Footer.jsx";
import Contenido from "./components/common/Contenido.jsx";


function App() {
	return (
		<>
			<BrowserRouter>
				<Cabecera />
				<Contenido>
					<Rutas />
				</Contenido>
				
				<Footer />
			</BrowserRouter>

		</>
	);
}

export default App;
