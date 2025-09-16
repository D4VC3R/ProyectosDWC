"use strict";

function getMediaPuntuaciones(equipo){
    let media = 0;

    for(let i=0; i<equipo.length; i++){
        media += equipo[i]
    }
    return media / equipo.length;
        
};

function getEquipoGanador(equipos){

    let maxMedia = 0;
    let indiceGanador;

    for(let i=0; i<equipos.length; i++){
        let media = getMediaPuntuaciones(equipos[i]);
        if(media > maxMedia) {
            maxMedia = media;
            indiceGanador = i;
        }
    }
    return indiceGanador;
}

function getNombreEquipo(indice){
    switch(indice){
        case 0: return "Equipo de Juan";
        break;
        case 1: return "Equipo de Miguel";
        break;
        case 2: return "Equipo de María";
        break;
        default: return "¡Empate!"
    }
}


export {getMediaPuntuaciones, getEquipoGanador, getNombreEquipo};