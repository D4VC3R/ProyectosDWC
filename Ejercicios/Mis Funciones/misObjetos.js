// Muestra las propiedades y valores de cualquier objeto por consola.
const mostrarObjeto = (objeto) => {
  for (const propiedad in objeto) {
    if (Object.hasOwn(objeto, propiedad)) {
      console.log(`${propiedad}: ${objeto[propiedad]}`);
    }
  }
};

// Calcula la media de los valores numéricos válidos de un objeto.
const calcularMediaNumerosObjeto = (obj) => {
  const valores = Object.values(obj).filter(v => isNumero(v));
  return valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
};

// Extrae todos los valores de un objeto y los almacena en un array plano
const extraerValoresObjeto = (objeto, resultado = []) => {
  for (const clave in objeto) {
    if (!tienePropiedad(objeto, clave)) continue;
    const valor = objeto[clave];

    if (isNuloOIndefinido(valor)) {
      resultado.push(valor);
    } else if (isArray(valor)) {
      if (isArrayVacio(valor)) {
        resultado.push([]);
      } else {
        valor.forEach(elemento => {
          if (isObjeto(elemento) || isArray(elemento)) {
            extraerValoresObjeto(elemento, resultado);
          } else {
            resultado.push(elemento);
          }
        });
      }
    } else if (isObjeto(valor)) {
      extraerValoresObjeto(valor, resultado);
    } else if (isFuncion(valor)) {
      resultado.push(valor); // Puedes omitir si no quieres funciones
    } else {
      resultado.push(valor);
    }
  }
  return resultado;
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