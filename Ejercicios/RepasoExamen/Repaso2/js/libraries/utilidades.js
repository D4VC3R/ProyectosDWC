"use strict";

export const getCabecera = () => {
	return [
        "caratula",
        "titulo",
        "interprete",
        "anyo",
        "genero",
        "localizacion",
        "prestado",
    ];
}

export const limpiarListado = () => {
  const tabla = document.getElementById("tablaDiscos");
  tabla.innerHTML =
    "<tr><th>Carátula</th><th>Título</th><th>Intérprete</th><th>Año</th><th>Género</th><th>Localización</th><th>Prestado</th><th>Eliminar</th></tr>";
  tabla.classList.add("oculto");
};

export const formatearGenero = (genero) => {
  switch (genero) {
    case "rock":
      return "Rock";
    case "popEs":
      return "Pop Español";
    case "popInt":
      return "Pop Internacional";
    case "rap":
      return "Rap / Hip-Hop";
    case "clasica":
      return "Música Clásica";
    case "techno":
      return "Techno";
    case "reggae":
      return "Reggae";
    default:
      return "Sin especificar";
  }
};

export const formatearEstado = (prestado) => {
  return prestado  ? "Si" : "No";
};