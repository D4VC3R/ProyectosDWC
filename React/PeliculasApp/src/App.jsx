import React from "react";
import "./App.css";
import Contenedor from "./components/common/Contenedor.jsx";
import Rutas from "./routes/Rutas.jsx";
import { BrowserRouter } from "react-router-dom";
import Cabecera from "./components/common/Cabecera.jsx";
import Footer from "./components/common/Footer.jsx";
import Contenido from "./components/common/Contenido.jsx";
import Menu from "./components/common/Menu.jsx";


function App() {
	/*
		Tenía dudas con la organización, no sabía si incluir aquí los componentes Cabecera, Menú y Footer, al final lo he organizado de la siguiente manera:
		- Contenedor contiene toda la estructura de la página (header, aside, main y footer). Allí se renderizan los componentes Cabecera, Menu y Footer, ya que normalmente son elementos que siempre están visibles en una web.
		- Contenido es el componente que muestra las distintas secciones de la aplicación. Se lo paso por children a Contenedor.
		- App solo se encarga de envolver todo en el BrowserRouter y renderizar Contenedor con Contenido dentro.
	*/
	return (
		<>
			<BrowserRouter>
			<Contenedor>

				<Contenido>
					<Rutas />
				</Contenido>

			</Contenedor>
			</BrowserRouter>
		</>
	);
}

export default App;
