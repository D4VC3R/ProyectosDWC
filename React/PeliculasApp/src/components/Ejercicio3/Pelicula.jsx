import React from "react";
import "./Pelicula.css";
import Interprete from "../Ejercicio2/Interprete";
import { useRef } from "react";
import { generarUuidAleatorio } from "../../libraries/misFunciones.js";


const Pelicula = (props) => {
    let noInfo = "Sin información."
    const taquillaRef = useRef(null);
	const elencoRef = useRef(null);

    const mostrarElenco = () => {
        elencoRef.current.classList.toggle("pelicula_elenco");
    };

    const mostrarTaquilla = () => {
        taquillaRef.current.classList.toggle("pelicula_taquilla");
    };


    return (
        <div className="pelicula_pelicula">
            <div className="pelicula_imagen">
                <img src={props.cartelera} className="pelicula_cartel" alt={props.titulo ? props.titulo : noInfo}></img>
            </div>
            <div className="pelicula_contenido">
                <h1 className="pelicula_titulo">{props.titulo ? props.titulo : noInfo}</h1>
                <h3 className="pelicula_director">Director: <em>{props.director ? props.director : noInfo}</em></h3>
                <div className="pelicula_genero">Género: <em>{props.clasificacion ? props.clasificacion : noInfo}</em></div>
                <div className="pelicula_resumen">{props.resumen ? props.resumen : noInfo}</div>
            </div>
            <div className="pelicula_botones">
                <h2 className="pelicula_elenco_boton"> <button onClick={mostrarElenco}>Elenco</button></h2>
                <h2 className="pelicula_taquilla_boton"> <button onClick={mostrarTaquilla}>Taquilla</button></h2>
            </div>
            <div ref = {taquillaRef} className="pelicula_taquilla_oculto">Recaudación: <em>{props.recaudacion ? props.recaudacion : noInfo}</em></div>
            <div className="pelicula_elenco_container">
                <div ref={elencoRef} className="pelicula_elenco_oculto">
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