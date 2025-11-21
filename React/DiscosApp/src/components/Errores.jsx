import React from 'react';
import './Errores.css';

const Errores = ({ errores }) => {
    const listaErrores = Object.values(errores);

    return (
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
    )
}

export default Errores;