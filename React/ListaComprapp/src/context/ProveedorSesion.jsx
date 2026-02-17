import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useSupabaseAUTH from '../hooks/useSupabaseAUTH.js';
import useSupabaseCRUD from '../hooks/useSupabaseCRUD.js';


const ContextoSesion = createContext();

const ProveedorSesion = ({ children }) => {

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

	// Hooks
	const { cargando, crearCuenta, iniciarSesion, cerrarSesion, getUsuario, getSuscripcion } = useSupabaseAUTH();
	const { obtenerUno } = useSupabaseCRUD();

	// Funciones
	const manejarCrearCuenta = async () => {
		try {
			// Sin nombre de usuario, no hay registro, decisión de diseño.
			if (!datosSesion.display_name) {
				throw new Error("Debes introducir un nombre de usuario ahora, que aún no he implementado ni PUT ni PATCH.");
			}
			// Validar que las contraseñas coincidan
			if (datosSesion.password !== datosSesion.confirmPassword) {
				throw new Error("Las contraseñas no coinciden.");
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
			setDatosSesion(datosSesionInicial);
			setErrorUsuario("");
			// No utilizo navegar aquí porque ya lo hago en el useEffect.
		} catch (error) {
			setErrorUsuario(error.message);
		}
	}

	const obtenerUsuario = async () => {
		try {
			const { user } = await getUsuario();
			if (!user) {
				throw new Error("No se puede recuperar la información de usuario.");
			}
			await obtenerDatosUsuario(user.id);
			setErrorUsuario(errorUsuarioInicial);
		} catch (error) {
			setErrorUsuario(error.message);
		}
	}


	const manejarDatosSesion = (evento) => {
		const { name, value } = evento.target;
		setDatosSesion({
			...datosSesion,
			[name]: value
		});
	}

	const getPerfil = async (id) => {
		try {
			const perfilUsuario = await obtenerUno('perfil_usuario', id, 'id');
			const { avatar, nombre, biografia } = perfilUsuario[0];
			setUsuario(usuario => ({
				...usuario,
				id,
				avatar,
				nombre,
				biografia
			}));
		} catch (error) {
			manejarFallo(error);
		}
	}

	const getRol = async (id) => {
		try {
			const rolUsuario = await obtenerUno('roles_usuario', id, 'id_rol');
			setUsuario(usuario => ({ ...usuario, rol: rolUsuario[0].rol }));
		} catch (error) {
			manejarFallo(error);
		}
	}

	const isAdmin = () => {
		return usuario.rol === 'admin';
	}

	const obtenerDatosUsuario = async (id) => {
		try {
			await Promise.all([
				getPerfil(id),
				getRol(id)
			]);
		} catch (error) {
			manejarFallo(error);
		}
	}

	const manejarFallo = (error) => {
		setErrorUsuario(error.message);
		setTimeout(() => {
			setErrorUsuario("");
		}, 5000);
	}

	// Efectos
	useEffect(() => {
		getSuscripcion((evento, sesion) => {
			if (sesion) {
				navegar("/");
				obtenerUsuario();
				setSesionIniciada(true);
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
		obtenerDatosUsuario,
		isAdmin,
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
export { ContextoSesion };