"use strict";

// -------------------------------
// Ejercicio 1 - El censor        |
// -------------------------------

// Versión fácil  .
export const censurarFacil = () => {
  const cuerpo = document.body;
  cuerpo.innerHTML = cuerpo.innerHTML.replaceAll(
    "sexo",
    '<span class = "censura"> contenido bloqueado </span>'
  );
};

// Versión "precisa".
const censurar = (nodo) => {
  nodo.innerHTML = nodo.innerHTML.replaceAll(
    "sexo",
    '<span class = "censura"> contenido bloqueado </span>'
  );
};

const getNodos = (nodoPadre) => {
  return nodoPadre.children;
};

// Como necesito pasarle parámetro para hacerla recursiva, primero le paso el body para empezar a recorrer nodos.
export const censurarNodos = (nodoPadre = document.body) => {
  const nodos = getNodos(nodoPadre);

  // Recorremos los nodos del body. Si el nodo es de tipo texto, censuramos, y si además ese nodo tiene childrens, los comprobamos.
  // He metido un <div> en el HTML para probarlo y parece que va bien.
  for (let i = 0; i < nodos.length; i++) {
    const nodo = nodos[i];
    // console.log(nodo.firstChild);
    nodo.TEXT_NODE && censurar(nodo);
    nodo.hasChildNodes() && censurarNodos(nodo);
  }
};

// --------------------------------
// Ejercicio 2 - Primos DOM        |
// --------------------------------

// Le paso parámetros para poder crear tablas del tamaño que quiera.
export const crearTabla = (filas, columnas) => {
  const cuerpo = document.body;
  const tabla = document.createElement("table");

  for (let i = 1; i <= filas; i++) {
    const fila = document.createElement("tr");

    for (let j = 1; j <= columnas; j++) {
      const celda = document.createElement("td");
      // {j} pinta las unidades e {i} pinta las decenas.
      celda.textContent = (i - 1) * columnas + j;
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  cuerpo.appendChild(tabla);
};

import { isPrimo } from "./misFuncionesNumericas.js";

export const pintarPrimos = () => {
  const tablas = document.getElementsByTagName("table");
  // console.log(tablas)
  // Hay que especificar qué tabla vamos a manipular para poder tener acceso a un montón de métodos que facilitan la vida una barbaridad.
  const tabla = tablas[0];
  // console.log(tabla)
  for (let i = 0; i < tabla.rows.length; i++) {
    const fila = tabla.rows[i];

    for (let j = 0; j < fila.cells.length; j++) {
      const celda = fila.cells[j];
      let numero = parseInt(celda.textContent);

      if (isPrimo(numero)) {
        celda.classList.add("isPrimo");
      }
    }
  }
};

// ---------------------------------
// Ejercicio 3 - Ocultar DOM        |
// ---------------------------------

import { getNumeroAleatorio } from "./misFuncionesNumericas.js";

const colorAleatorio = () => {
  return `rgb(${getNumeroAleatorio(0, 256)},${getNumeroAleatorio(0,256)},${getNumeroAleatorio(0, 256)})`;};

// Crea un párrafo y lo devuelve, así puedo toquetearlo luego.
const addParrafo = (id) => {
  let p = document.createElement("p");
  document.getElementById(id).appendChild(p);
  return p;
};

export const addDiv = (id) => {
  const div = document.createElement("div");
  div.id = id;
  document.body.appendChild(div);
};

// Selecciona un párrafo de los disponibles al azar y cambia sus atributos cada segundo.
const cambiarColor = (id) => {
  setInterval(() => {
    const div = document.getElementById(id);
    const parrafos = div.getElementsByTagName("p");

    parrafos[getNumeroAleatorio(0, parrafos.length - 1)].setAttribute(
      "style",
      `background:${colorAleatorio()}; color:${colorAleatorio()};`
    );
  }, 1000);
};

export const parrafosLocos = (id) => {
  for (let i = 0; i < 5; i++) {
    const nuevoParrafo = addParrafo(id);
    nuevoParrafo.innerHTML = `Párrafo ${i + 1}`;
  }
  cambiarColor(id);
};

// ----------------------------------
// Ejercicio 4 - Carrusel DOM        |
// ----------------------------------

const crearImg = (clase) => {
  const img = document.createElement("img");
  img.classList.add(clase);
  return img;
};

const anadirImg = (idDiv, img) => {
  const div = document.getElementById(idDiv);
  div.appendChild(img);
};

export const carrusel = (id) => {
  let yamcha = ["./imgs/yamcha/0.png", "./imgs/yamcha/1.png", "./imgs/yamcha/2.png", "./imgs/yamcha/3.png", "./imgs/yamcha/4.png"];
  let vegeta = ["./imgs/vegeta/0.png", "./imgs/vegeta/1.png","./imgs/vegeta/0 copy.png", "./imgs/vegeta/2.png", "./imgs/vegeta/3.png"];

  const imgYamcha = crearImg("yamcha");
  const imgVegeta = crearImg("vegeta");
  let indice = 0;

  setInterval(() => {
    anadirImg(id, imgYamcha);
    anadirImg(id, imgVegeta);
    // Se podría hacer con setAttribute, pero tener métodos según el elemento creado facilita mucho las cosas.
    imgVegeta.src = vegeta[indice];
    imgYamcha.src = yamcha[indice];
    // Que toggle acepte booleanos es una maravilla, aunque no sé si cumplo lo de "modificar el CSS a través de JS" ya que solo cambio la clase...
    // Lo intenté hacer con imgVegeta.style.right y style.position, pero la imagen aparecía directamente en la posición final.
    imgVegeta.classList.toggle("desplazar", indice === vegeta.length - 1);
    // Cuando índice valga lo mismo que la longitud del array, vuelve a 0.
    indice = (indice + 1) % vegeta.length;
  }, 1000);
};

  /* Pensaba aplicar el intervalo solo para cambiar el atributo src, pero por algún motivo que 
  /* no he alcanzado a entender, solo lo cambia si regenero el div por completo.
  /* Varías personas en StackOverFlow tenían el mismo problema y no he visto solución.
  /*
  setInterval(() => {
    imgVegeta.src = vegeta[indice];
    imgYamcha.src = yamcha[indice];
    imgVegeta.classList.toggle("desplazar", indice === vegeta.length - 1);
    indice = (indice + 1) % vegeta.length;
    // console.log(indice);
  }, 1000);
  */
