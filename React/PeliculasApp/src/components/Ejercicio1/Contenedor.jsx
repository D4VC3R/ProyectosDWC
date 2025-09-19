import React, { Children } from "react";
import "./Contenedor.css";

const Contenedor = (props) => {


    return(
        <div className="Contenedor_contenedor">
            <p>Contenedor</p>
            {props.children}
        </div>
    );
};

export default Contenedor;