// Reemplaza todas las apariciones de una palabra o texto en un nodo concreto.
const reemplazarTextoEnNodo = (nodo, texto, reemplazo) =>
  nodo.innerHTML = nodo.innerHTML.replaceAll(texto, reemplazo);

// Obtiene los hijos de un nodo.
const getNodos = (nodoPadre) => nodoPadre.children;

// Crea una tabla HTML con el número de filas y columnas indicado.
const crearTabla = (filas, columnas) => {
  const tabla = document.createElement("table");
  for (let i = 1; i <= filas; i++) {
    const fila = document.createElement("tr");
    for (let j = 1; j <= columnas; j++) {
      const celda = document.createElement("td");
      celda.textContent = (i - 1) * columnas + j;
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  return tabla;
};

// Añade un div con el id indicado al body.
const addDiv = (id) => {
  const div = document.createElement("div");
  div.id = id;
  document.body.appendChild(div);
  return div;
};

// Crea un párrafo y lo añade al elemento con el id indicado.
const addParrafo = (id) => {
  const p = document.createElement("p");
  document.getElementById(id).appendChild(p);
  return p;
};

// Crea una imagen con la clase indicada.
const crearImg = (clase) => {
  const img = document.createElement("img");
  img.classList.add(clase);
  return img;
};

// Añade una imagen a un div por id.
const anadirImg = (idDiv, img) => document.getElementById(idDiv).appendChild(img);