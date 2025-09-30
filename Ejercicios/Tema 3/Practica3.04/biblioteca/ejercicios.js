"use strict";

import { usuarios } from "./Ejercicio3.js";
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

// Fórmula para crear números enteros aleatorios entre dos valores, así la puedo reutilizar cuando quiera.
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
                                                // |  Ejercicio 3 - Arrays de objetos |
                                                //  ----------------------------------
// Usuario para probar addUsuario en el main.
const nuevoUsuario = {
    nombre: "Prueba",
    preferencias: { tema: "claro", idioma: "español", edad: 25 },
    contacto: {
      direccion: {
        calle: "Calle falsa, 123",
        localidad: "Elda",
        pais: "España",
      },
      correoelectronico: "correofalso@outlook.com",
      telefono: "123456789",
    },
  };

// Copiamos lo que ya hay en el array "usuarios" y le añadimos uno nuevo.
const addUsuario = (usuarios, usuarioNuevo) => {
    return [...usuarios, usuarioNuevo];
};

// isPositivo ya comprueba que sea número y mayor que 0.
const isMayorEdad = (edad) => {
    return isPositivo(edad) && edad >= 18;
};

// Utilizo el método filter porque con map crearía un array con valores undefined cuando no se cumple la condición.
const getMayoresDeEdad = (usuarios = []) => {
    const mayoresDeEdad = usuarios.filter((usuario) =>{
        if (isMayorEdad(usuario?.preferencias?.edad)) 
            return usuario;
    });
    return mayoresDeEdad;
};

// Si el string que le pasemos acaba en "yahoo.com", devuelve true.
const isYahoo = (email = "") => {
    return email.endsWith("@yahoo.com")
};

// Utilizamos isYahoo para comprobar el campo "correoelectronico" de cada usuario y extraer las coincidencias.
const getYahoo = (usuarios = []) => {
    const yahUsuarios = usuarios.filter((usuario)=> {
        if (isYahoo(usuario?.contacto?.correoelectronico)) {
            return usuario;
        }
    });
    return yahUsuarios;
};

// Los paso a LowerCase para asegurarme de que coincidan.
const isTemaClaro = (tema = "") => {
    return tema.toLocaleLowerCase().match('claro');
};

// El Locale viene bien por el tema de la 'ñ'.
const isEspanyol = (pais = "") => {
    return pais.toLocaleLowerCase().match('españa');
};

// Con esta función luego queda más limpia getUsuariosFiltrados.
const isUsuarioFiltrado = (usuario) => {
    return isTemaClaro(usuario?.preferencias?.tema) &&
    isEspanyol(usuario?.contacto?.direccion?.pais) &&
    isMayorEdad(usuario?.preferencias?.edad);
};

// Si se cumple cada una de las tres condiciones de isUsuarioFiltrado(), extraemos ese usuario.
const getUsuariosFiltrados = (usuarios) => {
    const usuariosFiltrados = usuarios.filter((usuario) =>{
        if (isUsuarioFiltrado(usuario)) {
            return usuario;
        }
    });
    return usuariosFiltrados;
};

// Función para comprobar si no tienen valor alguno de los posibles campos de usuario.
const isCampoVacio = (valor) => {
    return valor === null ||
    valor === undefined ||
    valor === "" ||
    (Array.isArray(valor) && valor.length === 0) ||
    (typeof valor === 'object' && !Array.isArray(valor) && Object.keys(valor).length === 0);
};

// Función para recorrer el objeto y aplicar isCampoVacio() donde toque.
const tieneCampoVacio = (usuarios) => {
    for (const clave in usuarios) {
        if (Object.hasOwn(usuarios, clave)){
            const valor = usuarios[clave];
            // Si el campo no es un objeto, comprobamos el valor de su clave.
            if (isCampoVacio(valor)) return true;
            // Si el campo es otro objeto, volvemos a recorrerlo llamándonos a nosotros mismos para ello.
            if (typeof valor === 'object' && valor !== null){
                if (tieneCampoVacio(valor)) return true;
            }
        }
    }
    // Si llegamos hasta aqui es que no hay campos vacíos.
    return false;
};

const getUsuariosIncompletos = (usuarios) => {
    const usuariosIncompletos = usuarios.filter((usuario) =>{
        if (tieneCampoVacio(usuario))
            return usuario;
    });
    return usuariosIncompletos;
};

// Como hay que añadir un apellido a todos los usuarios, podemos utilizar un map, aunque tengo dudas porque estamos creando 
// un nuevo array y no modificando el original...
const addApellidos = (usuarios) => {
    const usuariosConApellidos = usuarios.map(usuario =>{
        // Recorremos la lista de usuarios y a cada uno de ellos le ponemos lo que ya tiene y la clave "apellidos".
        return {...usuario, apellidos: "No indicado"};
    });
    return usuariosConApellidos;
};

// Vamos añadiendo a cada objeto dentro de usuario su contenido, cuando llegamos al objeto dirección añadimos ahí el código postal.
const addCodigoPostal = (usuarios) => {
    const usuariosConCodigo = usuarios.map(usuario => {
        return {...usuario, contacto: {...usuario?.contacto, direccion: {...usuario?.contacto?.direccion, codigo: "00000"}}};
    });
    return usuariosConCodigo;
};

export {nuevoUsuario, addUsuario, getMayoresDeEdad, getYahoo, getUsuariosFiltrados, getUsuariosIncompletos, addApellidos, addCodigoPostal};
