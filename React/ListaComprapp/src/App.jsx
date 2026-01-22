import React from 'react';
import './App.css';
import Footer from './components/common/Footer';
import Rutas from './routes/Rutas';

function App() {


  return (
    <>
      <div className="contenedor_contenedor">

        <div className="contenedor_principal">
          <Rutas />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
