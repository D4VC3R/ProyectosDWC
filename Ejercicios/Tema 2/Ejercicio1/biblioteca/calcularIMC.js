"use strict";

class Persona {
    constructor() {
        this.masa;
        this.altura;
    }
}

// Si se ha introducido valores correctos, calculamos y si no, insultamos.
function calcularIMC(masa, altura){
    if (!isNaN(masa) && !isNaN(altura))
        return masa / (altura * altura);
    else
        return "Introduce números, idiota."
};

// Creo que no sería necesario utilizar isNaN aquí ya que se supone que lo hemos comprobado en calcularIMC
function compararIMC(imcJuan, imcMarcos){
    if(!isNaN(imcJuan) && !isNaN(imcMarcos))
        return imcMarcos > imcJuan;
};

export { Persona, calcularIMC, compararIMC};

