// Importa el elemento suma de Calculadora.js.
import { sumar } from "./bibliotecas/calculadora.js";

// Importa varios elementos de una vez.
import { restar, multiplicar, multi } from "./bibliotecas/calculadora.js";

// Importac asiganandole un alias.
import { sumar as add } from "./bibliotecas/calculadora.js";

// Importa todos los elementos en un objeto.
import * as Feo from "./bibliotecas/calculadora.js";

console.log(sumar(8, 5));
console.log(add(5, 5));
console.log(Feo.restar(5, 5));
console.log(Feo.dividir(85, 0));
console.log(multi(5, 5)); 

/* Convenciones de uso.

    -> type="module" en el HTML que lo importa.
    -> import.js no contiene módulos, sólo realiza la importación.
    -> tienen extensión js, pero es posible encontrarlos como .es2015 o .mjs (menos extendidos).
    -> utiliza rutas UNIX para las rutas (como siempre).

 */

/**********************************
 *  Consideraciones sobre NaN.
 * */

let res = isNaN(8);

/* console.log(res); */
