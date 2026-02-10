import React from 'react';
import './App.css';
import Rutas from './routes/Rutas';
import Cabecera from './components/common/Cabecera';

function App() {
  /**
   * A la tercera va la vencida, el formato de peso y precio se muestra correctamente en toda la aplicación. Las funciones de formateo estan libraries/utilidades.js.
   * La consulta multitabla genérica está en useSupabaseCRUD.js y la específica para la tabla en ProveedorListas.jsx
   * Las mayor parte de las novedades están en components/lists y en context/ProveedorListas.jsx.
   * La página para agregar/quitar cosas de la lista es pages/Gestion.jsx.
   */

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
