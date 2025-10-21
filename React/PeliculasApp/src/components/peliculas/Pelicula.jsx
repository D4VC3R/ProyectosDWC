import React from "react";
import "./Pelicula.css";
import { useRef } from "react";
import Elenco from "./Elenco.jsx";
import Taquilla from "./Taquilla.jsx";


const Pelicula = (props) => {
    let noInfo = "Sin información."

    // Creamos unas referencias para los contenedores de elenco y taquilla,
    // de manera que le podamos quitar o poner la clase que los oculta.
    const taquillaRef = useRef(null);
    const elencoRef = useRef(null);

    // Al quitarle la clase, se utilizan los estilos definidos en el css de cada componente.
    const mostrarElenco = () => {
        elencoRef.current.classList.toggle("pelicula_elenco_container");
    };

    const mostrarTaquilla = () => {
        taquillaRef.current.classList.toggle("pelicula_taquilla_container");
    };


    return (
        <>
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
            </div>

            <div ref={taquillaRef} className="pelicula_taquilla_container">
                <Taquilla recaudacion={props.recaudacion} />
            </div>

            <div className="pelicula_elenco_container" ref={elencoRef}>
                <Elenco actores={props.actores} />
            </div>
        </>

    );

};
export default Pelicula;