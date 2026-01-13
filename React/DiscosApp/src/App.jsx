import React from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Cabecera from './components/common/Cabecera';
import Menu from './components/common/Menu';
import Contenido from './components/common/Contenido';
import Footer from './components/common/Footer';


function App() {
  return (
    <>
      <BrowserRouter>
        <div className="contenedor_contenedor">
          <Cabecera />
          <div className="contenedor_principal">
            <Menu vertical />
            <Contenido />
          </div>
            <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
