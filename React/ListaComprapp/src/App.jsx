import React from 'react';
import './App.css';
import Rutas from './routes/Rutas';
import Cabecera from './components/common/Cabecera';

function App() {
  /**
   * Cambios realizados:
   * - He descompuesto el hook useSupabase en tres hooks diferentes: useSupabase(comunicación con supabase), useSupabaseAUTH(funciones de sesión) y useSupabaseCRUD (funciones CRUD).
   * - He añadido doble confirmación de contraseña en el formulario de registro.
   * - Ya no hace falta pulsar el botón de filtrar, ahora filtra conforme se escribe.
   * 
   * 
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
