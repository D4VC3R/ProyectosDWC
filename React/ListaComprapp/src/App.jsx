import React from 'react';
import './App.css';
import Rutas from './routes/Rutas';
import Cabecera from './components/common/Cabecera';

function App() {
  // El proveedor de sesión está envolviendo a App en main.jsx
  // Y el de productos en components/WrapperProductos.jsx.

  return (
    <>
      <div className="contenedor_contenedor">
        <Cabecera />
        <div className="contenedor_principal">
          <Rutas />
        </div>
      </div>
    </>
  )
}

export default App
