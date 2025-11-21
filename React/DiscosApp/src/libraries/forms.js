"use strict";

// -------------------------------
// Parte II                       |
// -------------------------------

export const getFormulario = (nameForm) => {
  return document.forms[nameForm];
};

// He tenido que adaptarlas un poco para que reciban el valor directamente en lugar del campo.
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

export const getValidador = () => {
  return {
    titulo: validarTitulo,
    interprete: validarInterprete,
    anyo: validarAnyo,
    genero: validarGenero,
    localizacion: validarLocalizacion
  };
};

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

export const isDiscoValido = (disco) => {
  return comprobarFormObj(disco).length === 0;
}

// Al principio pensé en devolver un booleano, si todo valida devuelvo true, pero eso me complicaba luego mostrar los mensajes de error específicos.
// Devolviendo un array, si está vacío sé que todo ha ido bien y si no, ya tengo los mensajes de error según lo que haya fallado.
export const comprobarForm = (form) => {
  let arrayErrores = [];
  let mensajesError = getMensajesError();

  if (!validarTitulo(form.titulo)) {
    arrayErrores = [...arrayErrores, mensajesError.titulo];
  }
  if (!validarInterprete(form.interprete)) {
    arrayErrores = [...arrayErrores, mensajesError.interprete];
  }
  if (!validarAnyo(form.anyo)) {
    arrayErrores = [...arrayErrores, mensajesError.anyo];
  }
  if (!validarGenero(form.genero)) {
    arrayErrores = [...arrayErrores, mensajesError.genero];
  }
  if (!validarLocalizacion(form.localizacion)) {
    arrayErrores = [...arrayErrores, mensajesError.localizacion];
  }
  arrayErrores.length === 5 && (arrayErrores = [...arrayErrores, "Ya es difícil no rellenarme ni un solo campo bien..."]);

  return arrayErrores;
};

export const mostrarExito = () => {
	const mensajeExito = document.getElementById("exito");
	mensajeExito.textContent = "Disco guardado correctamente.";
	mensajeExito.classList.toggle("oculto");
}
// Rellenamos la lista con tantos errores como haya devuelto comprobarForm y los hacemos visibles al usuario.
export const mostrarError = (errores) => {
  const listaErrores = document.getElementById("errores");
  listaErrores.classList.toggle("oculto");

  errores.map((error) => {
    const li = document.createElement("li");
    li.textContent = error;
    listaErrores.appendChild(li);
  });
};

export const ocultarExito = () => {
	const mensajeExito = document.getElementById("exito");
	mensajeExito.classList.add("oculto");
}

// Para que no se me acumulen los errores en cada intento de envío, vacío la lista con innerHTML y la oculto otra vez.
export const limpiarErrores = () => {
  const listaErrores = document.getElementById("errores");
  listaErrores.innerHTML = "";
  listaErrores.classList.add("oculto");
};

export const marcarCampo = (campo, valido) => {
  if (!valido) {
    campo.classList.add("campo-invalido");
  }
  if (valido && campo.classList.contains("campo-invalido")) {
    campo.classList.remove("campo-invalido");
  }
};

// A tope con la modularidad.
export const crearDisco = (form) => {
  const disco = {
    id: crypto.randomUUID(),
    titulo: form.titulo.value,
    interprete: form.interprete.value,
    anyo: form.anyo?.value,
    caratula: form.caratula?.value,
    genero: form.genero?.value,
    localizacion: form.localizacion?.value,
    prestado: form.prestado?.value
  };
  return disco;
};
// Nos creamos un disco a partir del formulario y con el desparrame, lo añadimos a la colección.
export const guardarDisco = (form, coleccion) => {
  const disco = crearDisco(form);
  return [...coleccion, disco];
};

// Aquí me he complicado un poco de más la vida, si en lugar de una tabla hubiese hecho como en React con las películas, creando un div por cada disco, habría sido mejor.
// Pero en principio lo planteé así, asi que he tirado para adelante.
const mostrarDisco = (disco) => {
    const fila = document.createElement("tr");
		// Para asegurarme de que el atributo del disco se dibuje en la columna correcta y también es una forma fácil de excluir al ID.
    const columnas = [
        "caratula",
        "titulo",
        "interprete",
        "anyo",
        "genero",
        "localizacion",
        "prestado",
    ];

    columnas.forEach((columna) => {
        const celda = document.createElement("td");

        if (columna === "caratula") {
            const img = document.createElement("img");
            img.src = disco.caratula || "";
            img.alt = `Carátula de ${disco.titulo}`;
            img.className = "caratula";
            celda.appendChild(img);
        } else if (columna === "genero") {
            celda.textContent = formatearGenero(disco[columna]);
        } else if (columna === "prestado") {
            celda.textContent = formatearEstado(disco[columna]);
        } else {
            celda.textContent = disco[columna] || "Sin especificar";
        }
        fila.appendChild(celda);
    });
    const celdaBoton = document.createElement("td");
    celdaBoton.appendChild(botonEliminar(disco.id));
    fila.appendChild(celdaBoton);
		// Necesito la fila completa para añadirla a la tabla.
    return fila;
};

export const mostrarDiscos = (listado) => {
    const tabla = document.getElementById("tablaDiscos");
    document.getElementById("sinResultados").textContent = "";

    listado.forEach((disco) => {
        tabla.appendChild(mostrarDisco(disco));
    });
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

const formatearEstado = (prestado) => {
  return prestado === "false" ? "No" : "Sí";
};

// Dejo solo la cabecera de la tabla y me cargo lo que haya dentro de ella.
export const limpiarListado = () => {
  const tabla = document.getElementById("tablaDiscos");
  tabla.innerHTML =
    "<tr><th>Carátula</th><th>Título</th><th>Intérprete</th><th>Año</th><th>Género</th><th>Localización</th><th>Prestado</th><th>Eliminar</th></tr>";
};

// -------------------------------
// Parte III                      |
// -------------------------------

// Si alguna propiedad del disco contiene el criterio de búsqueda, lo incluyo en los resultados.
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

// Como tiene que aparecer un botón por cada disco, lo tengo que crear dinámicamente.
const botonEliminar = (id) => {
  const boton = document.createElement("button");
  boton.className = "borrar";
  boton.id = id;
  boton.textContent = "X";
  return boton;
};

// Clásico filter para devolver todo el array menos el disco elegido.
export const eliminarDisco = (json, id) => {
  return json.filter((disco) => disco.id !== id);
};

// -------------------------------
// Parte V                        |
// -------------------------------

// Devuelve el listado para almacenarlo en una variable cuando carguemos la página.
export const getListadoDiscos = () => {
  return JSON.parse(localStorage.getItem("listadoDiscos"));
};

// Le pasamos la colección actualizada para guardarla en el localStorage.
export const guardarListadoDiscos = (disco) => {
  const listadoActual = getListadoDiscos() || [];
  const nuevoListado = [...listadoActual, disco];
  localStorage.setItem("listadoDiscos", JSON.stringify(nuevoListado));
};
