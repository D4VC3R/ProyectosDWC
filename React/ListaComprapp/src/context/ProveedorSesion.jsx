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

	// Hooks
	const {cargando, crearCuenta, iniciarSesion, cerrarSesion, getUsuario, getSuscripcion} = useSupabaseAuth();

	// Funciones
	const manejarCrearCuenta = async () => {
		try {
			await crearCuenta(datosSesion.email, datosSesion.password);
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
			setErrorUsuario("");
			// No utilizo navegar aquí porque ya lo hago en el useEffect.
	} catch (error) {
			setErrorUsuario(error.message);
		}
	}

	const obtenerUsuario = async () => {
		try {
			const {user} = await getUsuario();
			setUsuario(user);
			setErrorUsuario(errorUsuarioInicial);

		}catch (error) {
			setErrorUsuario(error.message);
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
				navegar("/listado");
				setSesionIniciada(true);
				obtenerUsuario();
			} else {
				navegar("/login");
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