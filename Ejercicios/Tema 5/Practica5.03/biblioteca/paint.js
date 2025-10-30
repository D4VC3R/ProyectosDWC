"use strict";

import { colorAleatorio } from "../../../Plantilla/biblioteca/misFunciones.js";

// -------------------------------
// Ejercicio 1 - Plantilla        |
// -------------------------------

export const crearLista = (elementos = 6 ,id) => {
  const lista = document.getElementById(id);

  for (let i = 0; i < elementos; i++) {
    const li = document.createElement("li");
    lista.append(li)
  };
  // Podría ejecutar setColores en lugar de devolver la lista, pero así es más reutilizable
  return lista;
};

export const setColores = (listaColores) => {
  // Garantizar unos colores funcionales y si quieres más, la suerte proveerá.
  const colores = [
    "#FFFFFF",
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FF00FF",
    "#808080",
    colorAleatorio()
  ];

  for (let i = 0; i < listaColores.children.length; i++) {
    const valor = i < colores.length ? colores[i] : colorAleatorio();
    listaColores.children[i].setAttribute("style", `background-color: ${valor}`);
  }
};

export const crearTabla = (filas, celdas, idTabla) => {
  const tabla = document.getElementById(idTabla);
  for (let i = 0; i < filas; i++) {
    const fila = document.createElement("tr");
    tabla.append(fila)

    for (let j = 0; j < celdas; j++) {
      fila.append(document.createElement("td"))
    }
  }
};