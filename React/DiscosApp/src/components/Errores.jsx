import React from 'react'

const Errores = ({ errores }) => {
    const listaErrores = Object.values(errores);

    return (
        <div className="error">
            <h3>Errores de validación:</h3>
            <ul>
                {listaErrores.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    )
}

export default Errores;