"use strict";

import { getMes } from "./biblioteca/numToMes.js";

// Comprobaciones
console.log(getMes(1));
console.log(getMes(12));
console.log(getMes(5.4));
console.log(getMes(0));
console.log(getMes("F"));
