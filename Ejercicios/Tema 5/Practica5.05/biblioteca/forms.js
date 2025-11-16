"use strict";

// -------------------------------
// Parte II                       |
// -------------------------------

export const getFormulario = (nameForm) => {
  return document.forms[nameForm];
};

// Como título e intérprete son obligatorios, valido si o si. Género al tener que elegir uno si o si, lo he considerado obligatorio también.
export const validarTitulo = (campo) => {
  const titulo = campo.value;
  const expTitulo = /^.{5,}$/;

  let valido = expTitulo.test(titulo);
  marcarCampo(campo, valido);
  return valido;
};

export const validarInterprete = (campo) => {
  const interprete = campo.value;
  const expInterprete = /^.{5,}$/;
  let valido = expInterprete.test(interprete);
  marcarCampo(campo, valido);
  return valido;
};

export const validarGenero = (campo) => {
  let valido = campo.value !== "" && campo.value !== "reggaeton";
  marcarCampo(campo, valido);
  return valido;
};

// A partir de aquí, como son opcionales, solo valido si tienen contenido.
export const validarAnyo = (campo) => {
  const anyo = campo.value;
  const expAnyo = /^(19|20)\d{2}$/;
  let valido = true;

  if (anyo.trim() !== "") {
    valido = expAnyo.test(anyo);
    marcarCampo(campo, valido);
    return valido;
  }
  return valido;
};

export const validarLocalizacion = (campo) => {
  const localizacion = campo.value;
  const expLocalizacion = /^ES-\d{3}[A-Z]{2}$/;
  let valido = true;

  if (localizacion.trim() !== "") {
    valido = expLocalizacion.test(localizacion);
    marcarCampo(campo, valido);
    return valido;
  }
  return valido;
};

// Al principio pensé en devolver un booleano, si todo valida devuelvo true, pero eso me complicaba luego mostrar los mensajes de error específicos.
// Devolviendo un array, si está vacío sé que todo ha ido bien y si no, ya tengo los mensajes de error según lo que haya fallado.
export const comprobarForm = (form) => {
  let arrayErrores = [];

  if (!validarTitulo(form.titulo)) {
    arrayErrores = [...arrayErrores, "El título debe tener al menos 5 caracteres."];
  }
  if (!validarInterprete(form.interprete)) {
    arrayErrores = [...arrayErrores, "El intérprete debe tener al menos 5 caracteres."];
  }
  if (!validarAnyo(form.anyo)) {
    arrayErrores = [...arrayErrores, "¿Seguro que tienes claro el año de publicación?"];
  }
  if (!validarGenero(form.genero)) {
    arrayErrores = [...arrayErrores, "Lo siento, tienes que elegir un género musical."];
  }
  if (!validarLocalizacion(form.localizacion)) {
    arrayErrores = [...arrayErrores, "El formato, el formato, ¡el formato! Borra lo que hayas escrito y fíjate en el ejemplo."];
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

const marcarCampo = (campo, valido) => {
  if (!valido) {
    campo.classList.add("campo-invalido");
  }
  if (valido && campo.classList.contains("campo-invalido")) {
    campo.classList.remove("campo-invalido");
  }
};

// A tope con la modularidad.
const crearDisco = (form) => {
  const disco = {
    id: crypto.randomUUID(),
    titulo: form.titulo.value,
    interprete: form.interprete.value,
    anyo: form.anyo?.value,
    caratula: form.caratula?.value,
    genero: form.genero?.value,
    localizacion: form.localizacion?.value,
    prestado: form.prestado?.value,
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

const formatearGenero = (genero) => {
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
export const guardarListadoDiscos = (coleccion) => {
  localStorage.setItem("listadoDiscos", JSON.stringify(coleccion));
};
