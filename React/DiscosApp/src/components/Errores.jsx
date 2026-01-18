import React from 'react';
import './Errores.css';
import { useEffect } from 'react';
import { useState } from 'react';

const Errores = ({ errores }) => {
  const listaErrores = Object.values(errores);
  const [visible, setVisible] = useState(true);
  
  // Si visible es true, se renderiza el componente y si es false, devolvemos null para que se desmonte el componente automaticamente.
  // Hay que resetear el temporizador cuando se desmonta el componente para evitar errores.

  useEffect(() => {
    setVisible(true);
    const temporizador = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => {
      clearTimeout(temporizador);
    }
  }, [errores]);

  return (
    <>
      {!visible ? null :
        <div className="errores-container">
          <h3>Errores de validación:</h3>
          <ul>
            {listaErrores.length !== 0
              && listaErrores.map((error, indice) => {
                return (
                  <li key={indice}>{error}</li>
                )
              })
            }
          </ul>
        </div>
      }
    </>
  )
}

export default Errores;