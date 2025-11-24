"use strict";

// -------------------------------
// Ejercicio 1 - Promesa          |
// -------------------------------

export const plantilla = (objeto) => {
  let componente = "<div class='feo'";
  for (const campo in objeto){
    componente += `<p>${campo}: ${objeto[campo]}</p>`
  }
  componente += "</div>"
  return componente;
}

export const ordenar = (json) => {}