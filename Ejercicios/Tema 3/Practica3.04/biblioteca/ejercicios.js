"use strict";

import { isNumero, isPositivo } from "./misFuncionesNumericas.js";


                                                //  ----------------------------------
                                                // |  Ejercicio 1 - Mezclando objetos |
                                                //  ----------------------------------

const nombresPropios = ["Arthur", "Dutch", "John", "Sadie", "Abigail"];

const pasarAMayus = (nombres = []) => {
    const nombresMayus = nombres.map((nombre) => {
        return nombre.toUpperCase();
    });
    return nombresMayus;
};

const ordenAlfabeticoInverso = (nombres = []) => {
    const ordenados = nombres.sort().reverse();
    return ordenados;
};

// Por cada elemento del array creamos un objeto JSON y los devolvemos todos juntos en un nuevo array.
const addPropiedades = (nombres = []) => {
    const nombresConProps = nombres.map((nombrePropio, indice) =>{
        return {id: indice, nombre: nombrePropio};
    })
    return nombresConProps;
};

export {nombresPropios, pasarAMayus, ordenAlfabeticoInverso, addPropiedades};

                                                //  ----------------------------------
                                                // |  Ejercicio 2 - Filtrando objetos |
                                                //  ----------------------------------


const getNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/* Intenté hacerlo utilizando el método fill pero todos los arrays eran iguales.
//const generarArrayAleatorio = (min, max, elementosArray ) => {
//    const arrayAleatorio = [];
//    return arrayAleatorio.fill(getNumeroAleatorio(min, max), 0, elementosArray);
};
*/

// Con Array.from sí puedo hacer que llame a getNumeroAleatorio() para cada elemento del array.
const generarArrayAleatorio = (min, max, elementosArray) => {
    return Array.from({ length: elementosArray }, () => getNumeroAleatorio(min, max));
};


// Y ahora hacemos lo mismo pero especificando cuántos arrays queremos.
const getArrays = (cantidad, elementosArray, min, max) => {
    return Array.from({ length: cantidad }, () => generarArrayAleatorio(min, max, elementosArray));
};

// Para poder filtrar necesitamos recorrer cada uno de los tres arrays, pero como no hay que especificar a que array pertenece cada número
// superior a 5, voy a hacer trampas y los voy a juntar todos en un único array con el método flat.
const getArrayFinal = (arrays = [], filtro) =>{
    const arrayFinal = arrays.flat();
    return arrayFinal.filter(numero => numero > filtro);
};

// Y para formatear, pasamos el array a String con el metodo join, 
// separamos los elementos con comas y le añadimos un . al final.
const imprimirArray = (array = []) => {
    return array.join(', ') + '.';
};

export {getArrays, getArrayFinal, imprimirArray};


                                                //  ----------------------------------
                                                // |  Ejercicio 3 - Filtrando objetos |
                                                //  ----------------------------------


const addUsuario = (usuarios, usuarioNuevo) => {
    return [...usuarios, usuarioNuevo];
};

// isPositivo ya comprueba que sea numero y mayor que 0.
const isMayorEdad = (edad) => {
    return isPositivo(edad) && edad >= 18;
};

// Utilizo el método filter porque con map crearía un array con valores undefined si no se cumple la condición.
export const getMayoresDeEdad = (usuarios = []) => {
    const mayoresDeEdad = usuarios.filter((usuario) =>{
        if (isMayorEdad(usuario?.preferencias?.edad)) 
            return usuario;
    });
    return mayoresDeEdad;
};

const isYahoo = (email = "") => {
    return email.endsWith("@yahoo.com")
};

export const getYahoo = (usuarios = []) => {
    const yahUsuarios = usuarios.filter((usuario)=> {
        if (isYahoo(usuario?.contacto?.correoelectronico)) {
            return usuario;
        }
    });
    return yahUsuarios;
};

const isTemaClaro = (tema = "") => {
    return tema.toLocaleLowerCase.match('claro');
};

const isEspanyol = (pais = "") => {
    return pais.toLocaleLowerCase().match('españa');
}