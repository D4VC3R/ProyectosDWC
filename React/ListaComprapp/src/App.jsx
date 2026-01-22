import React from 'react';
import './App.css';
import Footer from './components/common/Footer';
import Rutas from './routes/Rutas';
import Cabecera from './components/common/Cabecera';

function App() {


  return (
    <>
      <div className="contenedor_contenedor">
        <Cabecera />
        <div className="contenedor_principal">
          <Rutas />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
