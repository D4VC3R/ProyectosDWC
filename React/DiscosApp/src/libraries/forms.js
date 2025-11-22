"use strict";

// -------------------------------
// Parte II                       |
// -------------------------------


// He adaptado las validaciones específicas de cada campo para pasarles el valor directamente en lugar del campo completo como hacía en vanilla.
export const validarTitulo = (valor) => {
  const expTitulo = /^.{5,}$/;
  return expTitulo.test(valor);
};

export const validarInterprete = (valor) => {
  const expInterprete = /^.{5,}$/;
  return expInterprete.test(valor);
};

export const validarGenero = (valor) => {
  return valor !== "" && valor !== "reggaeton";
};


export const validarAnyo = (valor) => {
  const expAnyo = /^(19|20)\d{2}$/;

  if (valor.trim() !== "") return expAnyo.test(valor);
  return true;
};

export const validarLocalizacion = (valor) => {
  const expLocalizacion = /^ES-\d{3}[A-Z]{2}$/;

  if (valor.trim() !== "") return expLocalizacion.test(valor);
  return true;
};

// Me creo un objeto con todas las funciones de validación asociadas al campo correspondiente.
export const getValidador = () => {
  return {
    titulo: validarTitulo,
    interprete: validarInterprete,
    anyo: validarAnyo,
    genero: validarGenero,
    localizacion: validarLocalizacion
  };
};

// Lo mismo con los mensajes de error.
export const getMensajesError = () => {
  return {
  titulo: "El título debe tener al menos 5 caracteres.",
  interprete: "El intérprete debe tener al menos 5 caracteres.",
  anyo: "¿Seguro que tienes claro el año de publicación?",
  genero: "Lo siento, tienes que elegir un género musical.",
  localizacion: "El formato, el formato, ¡el formato! Borra lo que hayas escrito y fíjate en el ejemplo.",
  patan: "Ya es difícil no rellenarme ni un solo campo bien..."
  }
}

// Y un objeto más, este lo utilizo para saber qué campos no han validado al enviar el formulario y así poderlos marcar en rojo.
export const validar = (disco) => {
  const validador = getValidador();
  const invalidos = {};

  for (const campo in validador) {
    if (!validador[campo](disco[campo])) {
      invalidos[campo] = true;
    }
  }
  return invalidos;
}

// Parecido al de vanilla pero recorriendo el validador en lugar de hacerlo campo por campo usando ifs.
export const comprobarFormObj = (disco) => {
  const validador = getValidador();
	const mensajesError = getMensajesError();
  let arrayErrores = [];

  for (const campo in validador) {
		const valor = disco[campo];
		if (!validador[campo](valor)){
			arrayErrores = [...arrayErrores, mensajesError[campo]];
		}
	}
	if (arrayErrores.length === 5) {
		arrayErrores = [...arrayErrores, mensajesError['patan']];
		}
		return arrayErrores;
}

// He intentado quitar toda la lógica posible de los componentes.
export const isDiscoValido = (disco) => {
  return comprobarFormObj(disco).length === 0;
}

// Estas tres no he tenido que tocarlas para nada.
export const marcarCampo = (campo, valido) => {
  if (!valido) {
    campo.classList.add("campo-invalido");
  }
  if (valido && campo.classList.contains("campo-invalido")) {
    campo.classList.remove("campo-invalido");
  }
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
  return prestado === "false" ? "No" : "Sí";
};


// -------------------------------
// Parte III                      |
// -------------------------------

// Igual que estaba.
export const buscarDiscos = (json, busqueda) => {
  const resultados = json.filter((disco) =>
      disco.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      disco.interprete.toLowerCase().includes(busqueda.toLowerCase()) ||
      (disco.anyo && disco.anyo.includes(busqueda)) ||
      (disco.genero && disco.genero.toLowerCase().includes(busqueda.toLowerCase())) ||
      (disco.localizacion && disco.localizacion.toLowerCase().includes(busqueda.toLowerCase()))
  );
  return resultados;
};

// -------------------------------
// Parte IV                       |
// -------------------------------


// En lugar de pasarle el listado como antes, lo obtengo directamente del localStorage y el listado que devuelve se lo paso al estado del componente.
export const eliminarDisco = (id) => {
  const listado = getListadoDiscos() || [];
  return listado.filter((disco) => disco.id !== id);
};

// -------------------------------
// Parte V                        |
// -------------------------------

// Igual que estaba.
export const getListadoDiscos = () => {
  return JSON.parse(localStorage.getItem("listadoDiscos"));
};

// Esta la voy a utilizar cuando añada un disco nuevo para no tener que recuperar el listado en el componente del formulario.
export const guardarDisco = (disco) => {
  const listadoActual = getListadoDiscos() || [];
  const nuevoListado = [...listadoActual, disco];
  localStorage.setItem("listadoDiscos", JSON.stringify(nuevoListado));
};

// Y en ListarDiscos utilizo esta para aprovechar el estado del listado que ya tengo ahí.
export const guardarListado = (listado) => {
  localStorage.setItem("listadoDiscos", JSON.stringify(listado));
}
