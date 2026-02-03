import erroresp from './../assets/json/errorESP.json'

export const traducirError = (error) => {
	const traduccion = erroresp[error.toLowerCase()];

	// Intento traducir y si no, devuelvo el error original en inglés, se ha intentado.
	if (!traduccion) {
		return error;
	}
	return  traduccion;
}

// Objeto escalable para controlar los parámetros del modal.
export const opcionesModal = {
    cerrarSesion: {
        title: "Cerrar sesión",
        message: "¿Seguro que quieres cerrar sesión?",
        confirmText: "Sabré yo...",
        cancelText: "Ah, pues no."
    },
    borrarProducto: {
        title: "Confirmar eliminación",
        message: "¿Estás seguro de eliminar este producto? Mira que esta acción no se puede deshacer...",
        confirmText: "Que sí, pesao, déjame.",
        cancelText: "Mejor no."
    }
}

export default opcionesModal;