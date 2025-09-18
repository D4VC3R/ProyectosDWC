"use strict";

import { calculadora } from "./biblioteca/calculadora.js";

// Comprobaciones
console.log(calculadora(5,2,"*"));
console.log(calculadora(5,2,"+"));
console.log(calculadora(5,2,"-"));
console.log(calculadora(5,2,"/"));
console.log(calculadora(5,0,"/"));
console.log(calculadora(5,2,"%"));
console.log(calculadora(5,2,"f"));
console.log(calculadora(5,2.5,"*"));