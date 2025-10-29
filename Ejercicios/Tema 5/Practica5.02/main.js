"use strict";

window.onload = () => {

  // Ejercicio 1

  const practica = document.body.firstElementChild;
	const divEj1 = practica.firstElementChild;

  divEj1.addEventListener(
    "click",
    (event) => {
      const elementoClicado = event.target;
			const elementosDiv = Array.from(divEj1.children);

      if (elementosDiv.indexOf(elementoClicado) % 2 === 0) {
        elementoClicado.nextElementSibling.classList.toggle("oculto");
      }
    },
    false
  );


// Ejercicio 2

const divEj2 = divEj1.nextElementSibling;
const pestanyas = Array.from(divEj2.firstElementChild.children);
const contenidos = Array.from(divEj2.lastElementChild.children);

divEj2.addEventListener("click", (evento) => {
	const elementoClicado = evento.target;
	if (pestanyas.includes(elementoClicado)) {
		const indicePestanya = pestanyas.indexOf(elementoClicado);
		pestanyas.forEach((pestanya, indice) => {
			if (indice === indicePestanya) {
				pestanya.classList.add("pestanya-activa");
				contenidos[indice].classList.remove("oculto");
			} else {
				pestanya.classList.remove("pestanya-activa");
				contenidos[indice].classList.add("oculto");
			}
		});
	}
});
};



