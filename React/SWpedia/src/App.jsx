import React from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Cabecera from './components/common/Cabecera';
import Contenido from './components/common/Contenido';
import Footer from './components/common/Footer';


function App() {
  /* 
  No se si me he liado o está bien, pero he considerado que estando todo tan relacionado
  (películas, personajes, vehículos...) lo mejor era cargar todo al inicio y luego filtrar
  según lo que se necesite en cada momento. Tampoco sabía muy bien donde poner los proveedores,
  los he metido en Rutas.jsx para que envuelvan toda la aplicación, ya me dirás si es una locura hacer eso.
  */

  return (
    <>
      <BrowserRouter>
        <div className="contenedor_contenedor">
          <Cabecera />
          <div className="contenedor_principal">
            <Contenido />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App