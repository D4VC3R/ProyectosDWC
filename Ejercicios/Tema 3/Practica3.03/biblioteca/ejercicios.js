"use strict";

import * as utilidades from "../../Practica3.04/biblioteca/misFuncionesNumericas.js";

// Hola Juan Carlos, esto es un aviso de que hay muchas cosas que no están hechas conforme a lo que dijiste en la clase del viernes.
// Verás algún for clásico, encadenamiento de Strings y algún vicio más que aún tengo de Java, los estoy corrigiendo, lo prometo.
// Lo que sí he arreglado es el ejercicio 5, aunque también te he dejado la versión original del ejercicio para que la "disfrutes". 
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

    // Para no tener que manejar los casos uno a uno dentro del for...in me dejo la faena hecha manualmente antes de recorrer el objeto.
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
    // En su lugar, pasamos el objeto 'notas' a un array utilizando el método 'values' de Object.
    calcularMedia: function() {
        let total = 0, elementos = 0;
        const valores = Object.values(this.notas);

        // Si es un número comprendido entre 0 y 10, lo aceptamos.
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

        // Por si el tío es un soso.
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
    // Pensaba cambiar esto después de la clase del viernes y hacerlo con un map, pero se me ha ido la vida arreglando el ejercicio 5. 
    imprimirInforme: function() {
        let resultado = " ======================\n";
        resultado += "| INFORME DEL DISCENTE |\n";
        resultado += " ======================\n\n";
        resultado += `ID: ${this.id}\n`;
        resultado += `Nombre completo: ${this.nombre} ${this.apellidos}.\n`;
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

// Para no copiar y pegar lo del ejercicio 1, he decidido hacer una función que añada la función matricular al curso.

export function addMatricula(curso){
    curso.matricular = function(discente) {
        this.alumnado = [...this.alumnado, discente];
    };
    return curso;
};


                                                // ---------------------------------------------
                                                // Ejercicio 5 - Mostrando objetos (versión pro)|
                                                // ---------------------------------------------

// Casi me cuesta la salud este ejercicio.
// Te he dejado abajo del todo la función que pensaba entregarte antes de la clase del viernes...


// Identificar de que tipo es el valor de la clave, antes esto se extendía durante toda la función.
const getTipo = (valor) => {
    if (valor === null) return 'null';
    if (Array.isArray(valor)) return 'array';
    return typeof valor;
};

const tratarNull = (clave, valor) => {
    console.log(`La clave: "${clave}" es ${valor}.`);
};

const tratarArrayVacio = (clave) => {
    console.log(`La clave: "${clave}" es de tipo array y está vacío.`);
};

// Si el array tiene elementos, informamos, pero que los identifique otro...
const tratarArrayLleno = (clave, valor) => {
    console.log(`La clave: "${clave}" es de tipo array y tiene ${valor.length} elementos.`);
    valor.forEach((elemento, indice) => {
        identificarElementos(elemento, indice);
    });
};

// Yo los identifico, pero como sea un objeto... qué pereza, paso el testigo.
const identificarElementos = (elemento, indice) => {
    const tipoElemento = typeof elemento;
    
    if (tipoElemento === 'object' && elemento !== null) {
        console.log(`Posición ${indice}: es de tipo ${tipoElemento} y tiene las siguientes propiedades:`);
        imprimirObjetoPro(elemento);
    } else {
        console.log(`Posición ${indice}: es de tipo ${tipoElemento} y su valor es ${elemento}.`);
    }
};

// Éste es el gitano que te pregunta qué llevas en los bolsillos.
const tratarArray = (clave, valor) => {
    if (valor.length === 0) {
        tratarArrayVacio(clave);
    } else {
        tratarArrayLleno(clave, valor);
    }
};

// Ok, eres un objeto, pero lo que lleves dentro no es cosa mía.
const tratarObjeto = (clave, valor) => {
    console.log(`La clave: "${clave}" es de tipo objeto y tiene las siguientes propiedades:`);
    imprimirObjetoPro(valor);
};

// Quizás me podría ahorrar el switch, pero me viene bien tener ese segundo default por si no logra identificar el objeto.
const tratarPrimitivos = (clave, valor, tipo) => {
    switch (tipo) {
        case 'number':
        case 'string':
        case 'boolean':
        case 'undefined':
            console.log(`La clave: "${clave}" es de tipo ${tipo} y su valor es ${valor}.`);
            break;
        default: 
            console.log(`Me has pillado, no sé de qué tipo es la clave: "${clave}".`);
            break;
    }
};

const tratarFuncion = (clave, valor) => {
    console.log(`La clave: "${clave}" es una función con ${valor.length} parámetros y este es su contenido:`);
    console.log(`${valor.toString()}`);
};

// La función principal es basicamente un switch que le pasa la faena al resto de funciones por cada elemento que tenga el objeto. 
export const imprimirObjetoPro = (objeto) => {
    for (const clave in objeto) {
        if (!Object.hasOwn(objeto, clave)) continue;
        
        const valor = objeto[clave];
        const tipo = getTipo(valor);
        
        switch (tipo) {
            case 'null':
                tratarNull(clave, valor);
                break;
            case 'array':
                tratarArray(clave, valor);
                break;
            case 'object':
                tratarObjeto(clave, valor);
                break;
            case 'function':
                tratarFuncion(clave, valor);
                break;
            default:
                tratarPrimitivos(clave, valor, tipo);
                break;
        }
    }
};

                                                // ----------------------------------------------
                                                // Ejercicio 5 - Mostrando objetos (versión noob)|
                                                // ----------------------------------------------
// Esto te pensaba entregar hasta que dijiste que si veías mas de 10 líneas ya te dolía la cabeza.
// Es verdad que la diferencia en claridad es abismal.


export const imprimirObjetoNoob = (objeto) => {
    for (const clave in objeto) {
        // Para mostrar solo las propiedades únicas del objeto y no las heredadas de Object. Gracias al snippet del for...in.
        if (!Object.hasOwn(objeto, clave)) continue; 
        
        const valor = objeto[clave];
        const tipo = typeof valor;

        // Comprobamos si es un objeto y si está vacío.
        if (tipo === 'object') {
            if (valor === null) {
                console.log(`La clave: ${clave} es ${valor}.`);
            } 
            // Si no está vacío, comprobamos si es un array y cuántos elementos tiene.
            else if (Array.isArray(valor)) {
                if (valor.length === 0) {
                    // He tenido que escribir array manualmente porque usando la variable 'tipo', me decía (con razón) que es de tipo Object.
                    console.log(`La clave: ${clave} es de tipo array y está vacío.`);
                } else {
                    console.log(`La clave: ${clave} es de tipo array y tiene ${valor.length} elementos.`);
                    // Recorremos el array para mostrar sus valores.
                    // Si el valor es otro objeto, utilizamos la recursividad.
                    valor.forEach((elemento, indice) => {
                        if (typeof elemento === 'object' && elemento !== null) {
                            console.log(`Posición ${indice}: es de tipo ${typeof elemento} y tiene las siguientes propiedades:`);
                            imprimirObjetoPro(elemento);
                        } else {
                            console.log(`Posición ${indice}: es de tipo ${typeof elemento} y su valor es ${elemento}.`);
                        } 
                    });
                }
            }
            // Si es un objeto que no es array ni null.
            else {
                console.log(`La clave: ${clave} es de tipo objeto y tiene las siguientes propiedades:`);
                imprimirObjetoPro(valor);
            }
        }
        // Y por último (¡al fin!), un switch para todo lo que no son estructuras complejas.
        else {
            switch (tipo) {
                case 'number':
                case 'string':
                case 'boolean':
                case 'undefined':
                    console.log(`La clave: ${clave} es de tipo ${tipo} y su valor es ${valor}.`);
                    break;
                case 'function':
                    console.log(`La clave: ${clave} es una función.`);
                    break;
                    // Cruzo los dedos para que no salte el default nunca.
                default: 
                    console.log(`Me has pillado, no sé de qué tipo es la clave: ${clave}.`);
                    break;
            }
        }
    }
};