"use strict";
/* 
	En esta ocasión no he utilizado un archivo externo de biblioteca ya que no he visto como reutilizar código.
	En el 2 creo que podría extraer una función de manejarPestanyas,
	pero no se me ocurre la manera de hacerlo sin pasarle muchos parámetros,
	necesitaría el evento y los dos arrays como poco.
*/

window.onload = () => {
  // Ejercicio 1

  // Selecciono el div del ejercicio 1 sin utilizar IDs ni clases.
  const practica = document.body.firstElementChild;
  const divEj1 = practica.firstElementChild;

  // Para no ponerle un listener a cada hijo, se lo pongo al div y luego compruebo qué hijo recibe el click.
  divEj1.addEventListener(
    "click",
    (event) => {
      const elementoClicado = event.target;
      // Paso el contenido de HTMLCollection a array para poder usar los índices, si es un hijo par el que recibe el click, se oculta o muestra el siguiente elemento hermano.
      const elementosDiv = Array.from(divEj1.children);
      if (elementosDiv.indexOf(elementoClicado) % 2 === 0) {
        elementoClicado.nextElementSibling.classList.toggle("oculto");
      }
    },
    false
  );

  // Ejercicio 2

  const divEj2 = divEj1.nextElementSibling;
  // La misma estrategia que arriba, en este caso utilizo el índice del array para relacionar las pestañas con los contenidos.
  const pestanyas = Array.from(divEj2.firstElementChild.children);
  const contenidos = Array.from(divEj2.lastElementChild.children);

  divEj2.addEventListener(
    "click",
    (evento) => {
      const elementoClicado = evento.target;
      // Como todo el div está "escuchando", necesito comprobar que se ha clicado en una pestaña.
      if (pestanyas.includes(elementoClicado)) {
        // Si es una pestaña, necesito saber cuál ha sido para mostrar el contenido que le toca.
        const indicePestanya = pestanyas.indexOf(elementoClicado);
        // Como el índice de la pestaña coincide con el índice del contenido, recorro ambos arrays y muestro/oculto según corresponda.
        // Lo he intentado hacer mas limpio con toggle pero me daba problemas, sobretodo al clicar varias veces la misma pestaña.
        pestanyas.forEach((pestanya, indice) => {
          if (indice === indicePestanya) {
            pestanya.classList.add("pestaña-activa");
            contenidos[indice].classList.remove("oculto");
          } else {
            pestanya.classList.remove("pestaña-activa");
            contenidos[indice].classList.add("oculto");
          }
        });
      }
    },
    false
  );
}; // Fin del window.onload.
