"use strict";

const validarTitulo = (titulo) => {
  const regEx = /\w{5,}/;
  console.log(titulo);
  let valido = regEx.test(titulo.value);
  marcarCampo(titulo, valido);
  return valido;
};

const validarInterprete = (interprete) => {
  const regEx = /\w{5,}/;
  let valido = regEx.test(interprete.value);
  marcarCampo(interprete, valido);
  return valido;
};

const validarAnyo = (anyo) => {
  const regEx = /(19|20)[0-9]{2}$/;
  let valido = true;
  if (anyo.value !== "") {
    valido = regEx.test(anyo.value);
  }
  marcarCampo(anyo, valido);
  return valido;
};

const validarGenero = (genero) => {
  let valido = genero.value !== "";
  marcarCampo(genero, valido);
  return valido;
};

const validarLocalizacion = (localizacion) => {
  const regEx = /^ES-[0-9]{3}[A-Z]{2}$/;
  let valido = true;
  if (localizacion !== "") {
    valido = regEx.test(localizacion.value.toUpperCase());
  }
  marcarCampo(localizacion, valido);
  return valido;
};

const marcarCampo = (campo, valido) => {
  if (!valido) {
    campo.classList.add("invalido");
  }
  if (valido && campo.classList.contains("invalido")) {
    campo.classList.remove("invalido");
  }
};

export const validarFormulario = (form) => {
  let errores = [];

  if (!validarTitulo(form.titulo)) {
    errores = [...errores, "El título es obligatorio."];
  }

  if (!validarInterprete(form.interprete)) {
    errores = [...errores, "El intérprete es obligatorio."];
  }

  if (!validarAnyo(form.anyo)) {
    errores = [...errores, "El disco que sea de este siglo."];
  }

  if (!validarGenero(form.genero)) {
    errores = [...errores, "Hay que escoger un género."];
  }

  if (!validarLocalizacion(form.localizacion)) {
    errores = [...errores, "Formato incorrecto."];
  }

  return errores;
};

export const comprobarForm = (form) => {
  return (
    !Array.isArray(validarFormulario(form)) ||
    !validarFormulario(form).length > 0
  );
};

export const comprobarCampo = (campo) => {
  switch (campo.name.toLowerCase()) {
    case "titulo":
      validarTitulo(campo);
      break;
    case "interprete":
      validarInterprete(campo);
      break;
    case "anyo":
      validarAnyo(campo);
      break;
    case "genero":
      validarGenero(campo);
      break;
    case "localizacion":
      validarLocalizacion(campo);
      break;
    default:
      break;
  }
};
