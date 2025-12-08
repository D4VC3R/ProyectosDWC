import React from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Cabecera from './components/common/Cabecera';
import Contenido from './components/common/Contenido';
import Footer from './components/common/Footer';
import { obtenerURLs } from './libraries/utilidades';
import { traerDatos } from './libraries/asincronismo';
import { useState, useEffect } from 'react';


function App() {
  // Me traigo las películas en la carga inicial de la página y se las paso a Peliculas.jsx a través de Contenido->Rutas...
  // Un poco rollo pero como he decidio mostrarlas en la página inicial creo que no me queda otra.
  const [peliculas, setPeliculas] = useState([]);

  const traerPeliculas = async () => { // Añadir try-catch
    const urlsPeliculas = obtenerURLs('films');
    const datos = await traerDatos(urlsPeliculas[0]);
    setPeliculas(datos);
  }

  useEffect(() => {
		traerPeliculas();
	}, []);

  return (
    <>
      <BrowserRouter>
        <div className="contenedor_contenedor">
          <Cabecera />
          <div className="contenedor_principal">
            <Contenido peliculas={peliculas} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App