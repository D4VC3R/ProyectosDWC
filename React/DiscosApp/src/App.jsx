import React from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Cabecera from './components/common/Cabecera';
import Menu from './components/common/Menu';
import Contenido from './components/common/Contenido';
import Footer from './components/common/Footer';


function App() {
  // He corregido lo que me comentaste sobre la estructura del contenedor principal, ahora se ve claramente en lugar de renderizar un componente que contenga esa estructura.
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
