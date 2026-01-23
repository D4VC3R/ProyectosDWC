import React, {createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import useSupabaseAuth from './../hooks/useSupabaseAuth.js';


const ContextoSesion = createContext();

const ProveedorSesion = ({children}) => {

	// Valores iniciales
	const datosSesionInicial = {
		email: "",
		password: ""
	};
	const usuarioInicial = {};
	const errorUsuarioInicial = "";
	const sesionIniciadaInicial = false;
	const navegar = useNavigate();

	// Estados
	const [datosSesion, setDatosSesion] = useState(datosSesionInicial);
	const [usuario, setUsuario] = useState(usuarioInicial);
	const [errorUsuario, setErrorUsuario] = useState(errorUsuarioInicial);
	const [sesionIniciada, setSesionIniciada] = useState(sesionIniciadaInicial);
	const [username, setUsername] = useState("");

	// Hooks
	const {cargando, crearCuenta, iniciarSesion, cerrarSesion, getUsuario, getSuscripcion} = useSupabaseAuth();

	// Funciones
	const manejarCrearCuenta = async () => {
		try {
			// Sin nombre de usuario, no hay registro, decisión de diseño.
			if (!datosSesion.display_name) {
				throw new Error("Debes introducir un nombre de usuario ahora, que aún no he implementado ni PUT ni PATCH.");
			}
			await crearCuenta(datosSesion.email, datosSesion.password, datosSesion.display_name);
			setErrorUsuario("Comprueba tu correo para verificar la cuenta.");
		} catch (error) {
			setErrorUsuario(error.message);
		}
	}

	const manejarInicioSesion = async () => {
		try {
			await iniciarSesion(datosSesion.email, datosSesion.password, {
				emailRedirectTo: "http://localhost:3000/inicio"
			});
	} catch (error) {
			setErrorUsuario(error.message);
		}
	}

	const manejarCierreSesion = async () => {
		try {
			await cerrarSesion();
			setUsuario(usuarioInicial);
			setDatosSesion(datosSesionInicial);
			setErrorUsuario("");
			// No utilizo navegar aquí porque ya lo hago en el useEffect.
	} catch (error) {
			setErrorUsuario(error.message);
		}
	}

	const obtenerUsuario = async () => {
		try {
			const {user} = await getUsuario();
			if (!user) {
				throw new Error("No se puede recuperar la información de usuario.");
			}
			setUsuario(user);
			setErrorUsuario(errorUsuarioInicial);
		}catch (error) {
			setErrorUsuario(error.message);
		}
	}

	const obtenerUsername = async () => {
		try {
			const {user} = await getUsuario();
			setUsername(user?.user_metadata?.display_name.toUpperCase());
		} catch (error) {
			setErrorUsuario("No se pudo recuperar el nombre de usuario: "+ error.message);
		}
	}

	const manejarDatosSesion = (evento) => {
		const {name, value} = evento.target;
		setDatosSesion({
			...datosSesion,
			[name]: value
		});
	}

	// Efectos
	useEffect(()=>{
		getSuscripcion((evento, sesion) => {
			if (sesion){
				navegar("/");
				setSesionIniciada(true);
				obtenerUsuario();
				obtenerUsername(); // Podría sacarlo directamente del usuario pero así no accedo a tantas claves.
			} else {
				navegar("/");
				setSesionIniciada(false);
				setUsuario(usuarioInicial);
		}
	})
	}, []);

	// Exportaciones
	const exportaciones = {
		manejarCrearCuenta,
		manejarInicioSesion,
		manejarCierreSesion,
		manejarDatosSesion,
		obtenerUsuario,
		username,
		sesionIniciada,
		usuario,
		datosSesion,
		errorUsuario,
		cargando
	}

	return (
		<>
			<ContextoSesion.Provider value={exportaciones}>
				{children}
			</ContextoSesion.Provider>
		</>
	)
}

export default ProveedorSesion
export {ContextoSesion};