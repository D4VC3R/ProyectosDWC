import erroresp from './../assets/json/errorESP.json'

export const traducirError = (error) => {

	const traduccion = erroresp[error.toLowerCase()];
	if (!traduccion) {
		return error
	}
	return  traduccion;
}