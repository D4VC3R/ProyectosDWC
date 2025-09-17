"use strict";

export function calcularPrecio (producto = "producto genérico", precio = 100, impuesto = 21){
    if (isNaN(precio) || isNaN(impuesto)) 
        return "Introduce un precio y un impuesto numérico, idiota.";
    else if (impuesto > 100 || impuesto < 0)
        return "El impuesto debe ser un numero entre 0 y 100";
    else if (precio <= 0)
        return "¡¡El producto es gratis!! Qué bien ¿eh?";

    return `El producto "${producto}" tiene un precio de ${precio += precio * (impuesto/100)}`;
    
}