import React from "react";
import { useState } from "react";
import "./ContadorLimite.css";

const ContadorLimite = () => {

  const [contador, setContador] = useState(0);

  // No hago comprobaciones aquí porque la propiedad disabled se encarga de ellas.
  const incrementarContador = () => setContador(contador + 1);
  const decrementarContador = () => setContador(contador - 1);

  return (

    <div className="Contador_container">
      <h3>Ejercicio 2</h3>
      <div className="Contador_botones">
        <button onClick={() => incrementarContador()} disabled={contador === 10}>Incrementar</button>
        <button onClick={() => decrementarContador()} disabled={contador === 0}>Decrementar</button>
      </div>
      <div className="Contador_resultado">
        <span>{contador}</span>
      </div>
    </div>
    );
};

export default ContadorLimite;
