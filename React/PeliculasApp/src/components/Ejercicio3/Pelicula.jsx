import React from "react";
import "./Pelicula.css";
import Interprete from "../Ejercicio2/Interprete";
import { generarUuidAleatorio } from "../../libraries/misFunciones.js";


const Pelicula = (props) => {
    let noInfo = "Sin información."
    return (
        <div className="pelicula_pelicula">
            <div className="pelicula_imagen">
                <img src={props.cartelera} className="pelicula_cartel" alt={props.titulo ? props.titulo : noInfo}></img>
            </div>
            <div className="pelicula_contenido">
                <h1 className="pelicula_titulo">{props.titulo ? props.titulo : noInfo}</h1>
                <h3 className="pelicula_director">Director: {props.director ? props.director : noInfo}</h3>
                <em className="pelicula_genero">{props.clasificacion ? props.clasificacion : noInfo}</em>
                <div className="pelicula_resumen">{props.resumen ? props.resumen : noInfo}</div>
            </div>
            <div className="pelicula_elenco_container">
                <h2 className="pelicula_elenco_titulo">Reparto</h2>
                <div className="pelicula_elenco">
                    {props.actores ? props.actores.map((actor)=>{
                        return (
                            <Interprete
                                key={generarUuidAleatorio()}
                                nombre={actor.nombre}
                                fechaNacimiento={actor.fechaNacimiento}
                                imagen={actor.imagen}
                                biografia={actor.biografia}
                            />
                        )
                    }):noInfo}
                </div>
            </div>
        </div>
);

};
export default Pelicula;