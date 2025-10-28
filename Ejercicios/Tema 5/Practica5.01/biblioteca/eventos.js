"use strict";

import { getNumeroAleatorio } from "./misFunciones.js";

// -------------------------------
// Ejercicio 1 - Saludar          |
// -------------------------------

  const div = document.body.firstElementChild;
  let intervalo = null;

export function saludar(){
  if (intervalo === null){
    intervalo = setInterval(() => {
      const h2 = document.createElement("H2");
      h2.textContent = "Hola feo";
      div.append(h2);
    }, 1000);
  }
};

export function pararSaludos(){
  if (intervalo !== null) {
    clearInterval(intervalo);
    intervalo = null;
  }
};

// -------------------------------
// Ejercicio 2 - Colorines        |
// -------------------------------

const div2 = document.body.firstElementChild.nextElementSibling;

export function cambiarColor(){
  div2.style.backgroundColor = `rgb(${getNumeroAleatorio(0, 255)},${getNumeroAleatorio(0,255)},${getNumeroAleatorio(0, 255)})`;
}

