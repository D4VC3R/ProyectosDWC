`use strict`;

function getMediaPuntuaciones(equipo){
    let media = 0;

    for(let i=0; i<equipo.length; i++){
        media += equipo[i]
    }
    return media / equipo.length;
        
};

function getNombreEquipo(indice){
    switch(indice){
        case 0: return  `Equipo de Juan`;
        case 1: return  `Equipo de Miguel`;
        case 2: return  `Equipo de María`;
        default: return  `¡Empate!`;
    }
}

function getEquipoGanador(equipos){

    let maxMedia = 0;
    let indicesGanadores = []; // Es un array para poder manejar los empates

    // Recopilación de las puntuaciones de cada equipo, si supera la máxima, actualizamos
    for(let i=0; i<equipos.length; i++){
        let media = getMediaPuntuaciones(equipos[i]);
        if(media > maxMedia) {
            maxMedia = media;
        }
    }
    
    // Luego se comprueba que equipos tienen la maxmia puntuación y se añaden a la lista de ganadores
    for(let i=0; i<equipos.length; i++){
        let media = getMediaPuntuaciones(equipos[i]);
        if(media === maxMedia) {
            indicesGanadores.push(i);
        }
    }
    
    // Si la lista de ganadores solo tiene un valor es que no ha habido empate
    if(indicesGanadores.length === 1) {
        let ganador = getNombreEquipo(indicesGanadores[0]); // El ganador siempre va a estar en la posición 0
        return `Ganador: ${ganador} con una media de ${maxMedia} puntos`;
    } 
    else 
        {
        // Si hay mas de un elemento en el array, sacamos los nombres de los equipos empatados
        let equiposEmpatados = indicesGanadores.map(indice => getNombreEquipo(indice));
        return `¡Empate! Los equipos ${equiposEmpatados.join(", ")} han empatado con una media de ${maxMedia} puntos`;
    }
}


export {getMediaPuntuaciones, getEquipoGanador, getNombreEquipo};