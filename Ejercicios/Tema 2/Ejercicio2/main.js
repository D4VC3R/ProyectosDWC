"use strict";

import { getMediaPuntuaciones, getEquipoGanador } from "./biblioteca/mediaEquipo.js";

const equipoJuan = [89, 120, 103];
const equipoMiguel = [116, 94, 123];
const equipoMaria = [7, 134, 105];

console.log(getMediaPuntuaciones(equipoJuan));
console.log(getMediaPuntuaciones(equipoMiguel));
console.log(getMediaPuntuaciones(equipoMaria));

const equipos = [equipoJuan, equipoMiguel, equipoMaria];

console.log((getEquipoGanador(equipos)));