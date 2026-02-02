import {useState} from "react";
import {traducirError} from '../libraries/utilidades.js'

const useSupabase = () => {

	const [cargando, setCargando] = useState(false);
	const [error, setError] = useState(null);

	// Función que se encarga de la comunicación exclusivamente.
	const solicitar = async (promesa) => {
		setCargando(true);
		setError(null);

		try {
			const {data, error} = await promesa;

			if (error) {
				// Si traducimos aqui los errores de supabase, ya no hay que hacerlo en ningún otro sitio.
				error.message = traducirError(error.message);
				throw error;
			}
			return data;
		} catch (error) {
			setError(error.message);
			throw error;
		} finally {
			setCargando(false);
		}
	}

	return {
		cargando,
		error,
		solicitar
	};
};

export default useSupabase;