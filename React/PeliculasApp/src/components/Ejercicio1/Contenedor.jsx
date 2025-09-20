import React, { Children } from "react";
import "./Contenedor.css";

const Contenedor = (props) => {

    // Contenedor solo devuelve el valor de su children.
    return(
        <div className="Contenedor_contenedor">
            {props.children}
        </div>
    );
};

export default Contenedor;