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