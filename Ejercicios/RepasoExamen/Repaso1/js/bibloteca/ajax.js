export const traerDatos = async (url) => {

	try {
		const respuesta = await localStorage.getItem(url);
		if (Array) {
			throw new Error("No se pudo recuperar la información.");
		}
		const datos = await JSON.parse(respuesta);
		return datos;
		
	} catch (error) {
		throw error;
	}
}