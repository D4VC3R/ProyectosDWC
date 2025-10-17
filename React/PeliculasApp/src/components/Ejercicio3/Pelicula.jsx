import React from "react";
import "./Pelicula.css";


const Pelicula = (props) => {
    // Iba a poner aqui los 3 interpretes pero me he dado cuenta de lo poco práctico que sería eso.
    return (
        <div className="pelicula_pelicula">
            <img src={props.cartel} className = "pelicula_cartel" alt={`Cartel de ${props.titulo}`}></img>
            <div className="pelicula_contenido">
                <h1 className="pelicula_titulo"><strong>{props.titulo}</strong></h1>
                <h3 className="pelicula_director">Director: {props.director}</h3>
                <em className="pelicula_calificacion">{props.calificacion}</em>
                <div className="pelicula_resumen"><i>{props.resumen}</i></div>
            </div>
            <div className="pelicula_elenco">{props.elenco}</div>
        </div>
);

};
export default Pelicula;