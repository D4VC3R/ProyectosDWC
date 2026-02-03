import { sb } from "../supabase/supabase.js";
import useSupabase from "./useSupabase.js";

const useSupabaseAUTH = () => {

	const { cargando, error, solicitar } = useSupabase();

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
	// options sirve para especificar redirecciones, entre otras cosas.
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

	return {
		cargando,
		error,
		crearCuenta,
		iniciarSesion,
		cerrarSesion,
		getUsuario,
		getSuscripcion
	};
};

export default useSupabaseAUTH;