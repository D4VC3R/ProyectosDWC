import erroresp from './../assets/json/errorESP.json'

export const traducirError = (error) => {
	const traduccion = erroresp[error.toLowerCase()];

	// Intento traducir y si no, devuelvo el error original en inglés, se ha intentado.
	if (!traduccion) {
		return error;
	}
	return  traduccion;
}

export const opcionesModal = {
    cerrarSesion: {
        title: "Cerrar sesión",
        message: "¿Estás seguro de que deseas cerrar sesión?",
        confirmText: "Cerrar sesión",
        cancelText: "Cancelar"
    },
    borrarProducto: {
        title: "Confirmar eliminación",
        message: "¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.",
        confirmText: "Eliminar",
        cancelText: "Cancelar"
    }
}

export default opcionesModal