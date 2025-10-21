import React from "react";
import "./App.css";
import Contenedor from "./components/common/Contenedor.jsx";
import Rutas from "./routes/Rutas.jsx";
import { BrowserRouter } from "react-router-dom";


function App() {
	/* 
	No te he puesto comentarios en esta práctica porque ha sido casi todo crear archivos y rutas.
	He reestructurado el proyecto, los componentes los pensaba dividir en dos carpetas de momento, una para lo más común/reutilizable y otra para todo lo relacionado con películas.
	También he añadido la carpeta pages para las páginas principales (Inicio, AcercaDe, Contacto, Productos) y una carpeta routes para las rutas.
	*/
	return (
		<>
			<BrowserRouter>
				<Rutas />
			</BrowserRouter>

		</>
	);
}

export default App;
