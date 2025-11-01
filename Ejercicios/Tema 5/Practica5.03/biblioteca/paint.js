"use strict";

import { colorAleatorio } from "./misFunciones.js";

// -------------------------------
// Ejercicio 1 - Pintarrajea      | 
// -------------------------------

// Obtenemos el elemento <ul> y lo rellenamos con tantos <li> (colores) como reciba por parámetro, asegurando mínimo 6.
export const crearLista = (elementos = 6 ,idLista) => {
  const lista = document.getElementById(idLista);

  for (let i = 0; i < elementos; i++) {
    const li = document.createElement("li");
    lista.append(li)
  };
  // Podría ejecutar setColores directamente en lugar de devolver la lista, pero así la función es más reutilizable.
  return lista;
};

// Recibe un elemento cualquiera, en esta caso será el <ul> que contenga la lista de colores. Recorremos los childrens de la lista y a cada uno se le asigna un color de fondo.
export const setColores = (listaColores) => {
  // Garantizar unos colores funcionales y si quieres más, la suerte proveerá.
  const colores = [
    "#FFFFFF",
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#808080",
    "#FF00FF",
    "#B13425",
    "#E39D29",
    "#6A6B04",
    colorAleatorio()
  ];

  for (let i = 0; i < listaColores.children.length; i++) {
    const valor = i < colores.length ? colores[i] : colorAleatorio();
    listaColores.children[i].setAttribute("style", `background-color: ${valor}`);
  }
};

// Le pasamos parámetros para hacerla reutilizable. Tantas filas como quieras, tantas casillas por fila como quieras.
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

// Con esto le doy estilo al color seleccionado, asegurando que solo pueda haber uno con la apariencia de activo.
export function alternarBotonActivo(lista, elemento) {
  lista.forEach((color) => {
    if (color.classList.contains("activo")) {
        color.classList.remove("activo");
    }
  });
  elemento.classList.toggle("activo");
}

export function getInfoColor(estilo, idElemento){

  const infoColor = document.getElementById(idElemento);
  // Extraemos el color a partir del atributo background-color y eliminamos los espacios sobrantes.
  const color = estilo.replace("background-color:", "").trim();

  infoColor.innerHTML = `Color seleccionado: ${color}`;

  // Como quiero mostrar el mensaje con el mismo color que se ha seleccionado, necesito una solución para cuándo coincide con el color de fondo de la página.
  color !== "#FFFFFF" 
  ? infoColor.setAttribute("style", `color: ${color}`)
  : infoColor.setAttribute("style", `color: #000000`);
}