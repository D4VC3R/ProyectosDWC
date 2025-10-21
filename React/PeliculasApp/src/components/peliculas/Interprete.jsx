import React from "react";
import "./Interprete.css";

const Interprete = (props) => {
    let noInfo = "Sin información."
    return (
        <div className="interprete_interprete">
            <img src={props.imagen} className="interprete_foto" alt={`Foto de ${props.nombre}`}></img>
            <div className="interprete_contenido">
                <h2 className="interprete_nombre">{props.nombre ? props.nombre : noInfo}</h2>
                <time className = "interprete_fecha" dateime={`${props.fechaNacimiento}`}>
                    {props.fechaNacimiento ? props.fechaNacimiento : noInfo}</time>
                <div className="interprete_biografia">{props.biografia ? props.biografia : noInfo}</div>
            </div>
        </div>
    );
};

export default Interprete;
