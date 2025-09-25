"use strict";

import * as utilidades from "./misFuncionesNumericas.js";

                                                // -------------------------------
                                                // Ejercicio 1 - Constructor     |
                                                // -------------------------------

// Si el año no es válido no debería crear el objeto y lanzar una excepción, pero complicaba demasiado el ejercicio al detener la ejecución de todo el programa.
export const creaCurso = (nombreCurso, anyoCurso, descripcionCurso, alumnadoCurso = []) => {
        return {
            nombre: nombreCurso,
            anyo: isAnyoValido(anyoCurso) ? anyoCurso : `El año del curso debe ser un valor comprendido entre 1900 y ${new Date().getFullYear() + 5}`,
            descripcion: descripcionCurso,
            alumnado: [...alumnadoCurso]
        };
        
};

// Comprobamos que el dato introducido como año no sea una locura.
const isAnyoValido = (anyo) =>{

    const anyoMinimo = 1900; 
    const anyoMaximo = new Date().getFullYear() + 5; 

    return (utilidades.isNumero(anyo) && (anyo >= anyoMinimo && anyo <= anyoMaximo));
};


                                                // --------------------------------
                                                // Ejercicio 2 - Mostrando objetos |
                                                // --------------------------------

export const mostrarObjeto = (objeto) => {

    // Para no tener que manejar los casos uno a uno dentro del for in me dejo la faena hecha manualmente antes de recorrer el objeto.
    const nombresPropiedades = {
        'nombre': 'Nombre',
        'anyo': 'Año',
        'descripcion': 'Descripción',
        'alumnado': 'Alumnado',
    };

    // Utilizamos el nombre corregido de cada propiedad junto a su valor.
    for (const propiedad in objeto) {
        console.log(`${nombresPropiedades[propiedad]}: ${objeto[propiedad]}`);
    }
};

                                                // ----------------------------------
                                                // Ejercicio 3 - Recorriendo objetos |
                                                // ----------------------------------

export const discente = {
    id: 4,
    nombre: "David",
    apellidos: "Cerdán Valero",
    aficiones: ["cine","videojuegos","saltar a la comba"],
    notas: {
        primera: 5.3,
        segunda: 7.1,
        tercera: 6.6
    },
    // Como notas es un objeto JSON y además admite decimales, no puedo reutilizar "utilidades.getMediaAritmetica".
    // En su lugar, pasamos el objeto 'notas' a un array utilizando el método 'values' del objeto Object.
    calcularMedia: function() {
        let total = 0, elementos = 0;
        const valores = Object.values(this.notas);

        valores.forEach(numero => {
            if (utilidades.isNumero(numero) && utilidades.isNotaValida(numero)) {
                total += numero;
                elementos++;
            }
        });
        return total / elementos;
    },
    imprimirAficiones: function() {
        let resultado = "Aficiones: ";

        // Por si el tio es un soso.
        if (this.aficiones.length === 0) {
            return `Ninguna.`;
        }

        // Utilizo el for para poder controlar si es el último elemento del array e imprimir un punto en lugar de la coma.
        for (let i = 0; i <= this.aficiones.length-1; i++) {
            if (i === this.aficiones.length-1) {
                resultado += `y ${this.aficiones[i]}.`;
            } else {
            resultado += `${this.aficiones[i]}, `;
            }
        }
        return resultado;
    },
    // Seguro que hay manera de hacerlo con un map y además, correctamente formateado... Yo lo he hecho "a lo bruto".
    imprimirInforme: function() {
        let resultado = " ======================\n";
        resultado += "| INFORME DEL DISCENTE |\n";
        resultado += " ======================\n\n";
        resultado += `ID: ${this.id}\n`;
        resultado += `Nombre completo: ${this.nombre} ${this.apellidos}\n`;
        resultado += `${this.imprimirAficiones()}\n\n`;
        resultado += "Notas por evaluación:\n";
        resultado += `  - Primera evaluación: ${this.notas.primera}\n`;
        resultado += `  - Segunda evaluación: ${this.notas.segunda}\n`;
        resultado += `  - Tercera evaluación: ${this.notas.tercera}\n`;
        resultado += `Nota media: ${this.calcularMedia().toLocaleString("es-ES")}\n`;
        
        
        return resultado;
    }
};

                                                // ----------------------------------
                                                // Ejercicio 4 - Modificando objetos |
                                                // ----------------------------------


export function addMatricula(curso){
    curso.matricular = function(discente) {
        this.alumnado = [...this.alumnado, discente];
    };
    return curso;
};


                                                // ------------------------------------------
                                                // Ejercicio 5 - Mostrando objetos (otra vez)|
                                                // ------------------------------------------

