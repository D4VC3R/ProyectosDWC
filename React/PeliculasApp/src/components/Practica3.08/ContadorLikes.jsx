import React from 'react';
import { useState } from 'react';
import likeImg from "../../assets/like-svgrepo-com.svg";
import dislikeImg from "../../assets/dislike-svgrepo-com.svg"
import "./ContadorLikes.css"

const ContadorLikes = () => {

  // Innecesario en este caso pero así voy cogiendo la costumbre.
  const valorIniLikes = 0;
  const valorIniDislikes = 0;

  // Creamos un estado para cada contador.
  const [contLikes, setContLikes] = useState(valorIniLikes);
  const [contDislikes, setContDislikes] = useState(valorIniDislikes);

  const incrementarLikes = () => setContLikes(contLikes + 1);
  const incrementarDislikes = () => setContDislikes(contDislikes + 1);

  return (
    <div className="contadorLikes_container">
      <h3>Ejercicio 3</h3>
      <div className="contadorLikes_botones">
        <div className="contadorLikes_likes">
          <img src={likeImg} alt="botón like" onClick={() => incrementarLikes()} />
          <span>{contLikes}</span>
        </div>

        <div className="contadorLikes_dislikes">
          <img src={dislikeImg} alt="botón dislike" onClick={() => incrementarDislikes()} />
          <span>{contDislikes}</span>
        </div>
      </div>
    </div>
  )
}

export default ContadorLikes