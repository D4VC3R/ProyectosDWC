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
  según lo que se necesite en cada momento. Al hacerlo así, no he visto necesario utilizar Promise.allSettled.
  
  Tampoco sabía muy bien donde poner los proveedores y los he terminado metiendo en Rutas.jsx para que envuelvan toda la aplicación, 
  ya me dirás si es una locura hacer eso, los empecé poniendo cada uno con sus componentes respectivos 
  pero te vas dando cuenta de que al final casi todos los componentes necesitan datos de varios proveedores y al final mira, en rutas y arreando.
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