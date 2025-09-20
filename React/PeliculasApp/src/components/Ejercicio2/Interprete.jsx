import React from "react";
import "./Interprete.css";

const Interprete = (props) => {
    // Poco que comentar, utilizamos los atributos de props donde toca y poco mas.
    return (
        <div className="Interprete_interprete">
            <img src={props.foto} alt={`Foto de ${props.nombre}`}></img>
            <div className="contenido">
                <h2 className="nombre">{props.nombre}</h2>
                <div className="biografia">{props.children}</div>
            </div>
        </div>
    );
};

export default Interprete;
