import React from 'react';
import './App.css';
import Cabecera from './components/common/Cabecera';
import Contenido from './components/common/Contenido';
import Footer from './components/common/Footer';

function App() {


  return (
    <>
      <div className="contenedor_contenedor">
        <Cabecera />
        <div className="contenedor_principal">
          <Contenido />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
