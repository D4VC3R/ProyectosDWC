import React, { useState } from "react";
import "./Listado.css";


const Listado = () => {
    let [listado, setListado] = useState([]);
    
    return (
        <div className="Listado_listado">
            <p> 
                <button onClick={}>Generar</button>
                <button onClick={}>Eliminar</button>
            </p>
        </div>
);

};
export default Listado;