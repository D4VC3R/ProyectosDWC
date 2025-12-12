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