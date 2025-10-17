import React from "react";
import "./Interprete.css";

const Interprete = (props) => {
    // Poco que comentar, utilizamos los atributos de props donde toca y poco mas.
    return (
        <div className="interprete_interprete">
            <img src={props.foto} className="interprete_foto" alt={`Foto de ${props.nombre}`}></img>
            <div className="interprete_contenido">
                <h2 className="interprete_nombre">{props.nombre}</h2>
                <div className="interprete_biografia">{props.children}</div>
            </div>
        </div>
    );
};

export default Interprete;
