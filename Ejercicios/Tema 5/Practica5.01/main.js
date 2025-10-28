"use strict";

import { saludar, pararSaludos, cambiarColor } from "./biblioteca/eventos.js";
window.onload = () => {

// Ejercicio 1

const div = document.body.firstElementChild;
const btnParar = div.lastElementChild;
const btnSaludar = btnParar.previousElementSibling;


btnSaludar.addEventListener("click", saludar, false);
btnParar.addEventListener("click", pararSaludos, false)

// Ejercicio 2

const div2 = div.nextElementSibling;

div2.addEventListener("dblclick", cambiarColor, false);

// Ejercicio 3

const div3 = div2.nextElementSibling;
const parrafo = div3.lastElementChild;

  document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    parrafo.textContent = `Posición del ratón: (x: ${x}, y: ${y})`;
  });
































}