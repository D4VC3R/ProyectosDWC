import {useState} from "react";
import { sb } from "../supabase/supabase.js";
import {traducirError} from './../libraries/utilidades.js'


const useSupabaseAuth = () => {

	const [cargando, setCargando] = useState(false);
	const [error, setError] = useState(null);

	const solicitar = async (promesa) => {
		setCargando(true);
		setError(null);

		try {
			const {data, error} = await promesa;

			if (error) {
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
	}

	return {
		cargando,
		error,
		crearCuenta,
		iniciarSesion,
		cerrarSesion,
		getUsuario,
		getSuscripcion,
	};
};

export default useSupabaseAuth;