import React from "react";
import "./Interprete.css";

const Interprete = (props) => {


    return(
        <div className="interprete">
            <img src={props.foto} alt={`Foto de ${props.nombre}`}></img>
            <div className="contenido">
                <h2 className="nombre">{props.nombre}</h2>
                    <div className="biografia">
                        Biografia: {props.children}
                    </div>
            </div>
        </div>
    );
};

export default Interprete;