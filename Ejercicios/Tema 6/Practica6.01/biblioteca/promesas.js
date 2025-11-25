"use strict";

// -------------------------------
// Ejercicio 1 - Promesa          |
// -------------------------------

export const plantilla = (objeto) => {
  let componente = `<div class='feo'>
  <p>Nombre: ${objeto.first_name}</p>
  <p>Apellido: ${objeto.last_name}</p>
  <p>Email: ${objeto.email}</p>
  <p>Género: ${objeto.gender}</p>
  <p>IP: ${objeto.ip_address}</p>
  </div>
  <hr>`;
  return componente;
}

/** @param {Array} array */
export const ordenar = (array) => {
  return array.toSorted((a, b)=> a.first_name.localeCompare(b.first_name, 'es'));
}

export const plantillaSW = (objeto) => {
  let componente = `<div class='feo'>
  <p>Nombre: ${objeto.name}</p>
  <p>Peso: ${objeto.mass}Kg.</p>
  <p>Año de nacimiento: ${objeto.birth_year}</p>
  <p>Género: ${objeto.gender}</p>
  <p>Color de pelo: ${objeto.hair_color}</p>
  </div>
  <hr>`;
  return componente;
}