import {useState} from "react";
import { sb } from "../supabase/supabase.js";
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

	// Funciones de sesión
	const crearCuenta = (email, password, display_name) => {
		return solicitar(
			sb.auth.signUp({
				email,
				password,
				options: {
					data: {
						display_name: display_name
					}
				}
			})
		);
	};

	const iniciarSesion = (email, password, options = {}) => {
		return solicitar(
			sb.auth.signInWithPassword({
				email,
				password,
				options
			})
		);
	};

	const cerrarSesion = () => {
		return solicitar(sb.auth.signOut());
	};

	const getUsuario = () => {
		return solicitar(sb.auth.getUser());
	};

	const getSuscripcion = (funcion) => {
		return sb.auth.onAuthStateChange(funcion);
	};

	// Funciones para CRUD
	const obtenerTodo =  (tabla) => {
		return  solicitar(sb.from(tabla).select('*'));
	};

	const obtenerUno = (tabla, uuid) => {
		return solicitar(sb.from(tabla).select('*').eq("uuid", uuid));
	};

	const filtrarILike = (tabla, columna, valor) => {
		return solicitar(sb.from(tabla).select('*').ilike(columna, `%${valor}%`));
	};

	const filtrarIgualOMenor = (tabla, columna, valor) => {
		return solicitar(sb.from(tabla).select('*').lte(columna, valor))
	};

	const ordenarTabla = (tabla, columna, asc = true) => {
		return solicitar(sb.from(tabla).select('*').order(columna, {ascending:asc}));
	};


	return {
		cargando,
		error,
		crearCuenta,
		iniciarSesion,
		cerrarSesion,
		getUsuario,
		getSuscripcion,
		obtenerTodo,
		obtenerUno,
		filtrarILike,
		filtrarIgualOMenor,
		ordenarTabla
	};
};

export default useSupabase;