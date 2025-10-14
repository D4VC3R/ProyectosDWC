"use strict";

                                                // -------------------------------
                                                // Ejercicio 1 - El censor        |
                                                // -------------------------------

// Versión fácil  .                                              
export const censurarFacil = () => {
    let cuerpo = document.body;
    cuerpo.innerHTML = cuerpo.innerHTML.replaceAll("sexo", '<span class = "censura"> contenido bloqueado </span>');
};

// Versión "precisa".
const censurar = (nodo) => {
    nodo.innerHTML = nodo.innerHTML.replaceAll("sexo", '<span class = "censura"> contenido bloqueado </span>');
};

export const censurarEloyStyle = () => {
    let cuerpo = document.body;
    let nodos = cuerpo.children;

    // Recorremos los nodos del body.
    for (let i = 0; i < nodos.length; i++) {
        const nodo = nodos[i];
        //console.log(nodo.firstChild);
        // Si el nodo tiene children y es de tipo texto, censuramos.
        if (nodo.firstChild && typeof nodo.innerHTML === "string") {
            censurar(nodo);
        }
    }
};

                                                // --------------------------------
                                                // Ejercicio 2 - Primos DOS        |
                                                // --------------------------------
                                                

export const crearTabla = () =>{
    let cuerpo = document.body;
    let tabla = document.createElement("table");
    let fila = document.createElement("tr");
    let celda = document.createElement("td");

    cuerpo.innerHTML += tabla
    for (let i = 1; i <= 10; i++) {
        
        
    }
}