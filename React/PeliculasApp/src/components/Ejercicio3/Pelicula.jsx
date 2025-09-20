import React from "react";
import "./Pelicula.css";
import Interprete from "../Ejercicio2/Interprete.jsx";

const Pelicula = (props) => {
    // Iba a poner aqui los 3 interpretes pero me he dado cuenta de lo poco práctico que sería eso.
    return (
        <div className="Pelicula_pelicula">
            <img src={props.cartel} alt={`Cartel de ${props.titulo}`}></img>
            <div className="contenido">
                <h1 className="titulo"><strong>{props.titulo}</strong></h1>
                <h3 className="director">Director: {props.director}</h3>
                <div className="resumen"><i>{props.children}</i></div>
            </div>
            <div className="elenco">{props.elenco}</div>
        </div>
);

};
export default Pelicula;