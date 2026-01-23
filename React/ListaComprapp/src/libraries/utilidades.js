import erroresp from './../assets/json/errorESP.json'

export const traducirError = (error) => {
	const traduccion = erroresp[error.toLowerCase()];

	// Intento traducir y si no, devuelvo el error original en inglés, se ha intentado.
	if (!traduccion) {
		return error;
	}
	return  traduccion;
}