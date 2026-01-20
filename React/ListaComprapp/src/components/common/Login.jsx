import React from 'react'
import useSesionContext from '../../hooks/useSesionContext.js'
import { useRef } from 'react';

const Login = () => {
	const {manejarCrearCuenta, manejarInicioSesion, manejarDatosSesion, errorUsuario, cargando} = useSesionContext();
	const form = useRef(null);

	return (
		<>
		<div className="login-usuario">
			<form name="loginForm" className="formulario-login" ref={form}>
				<h2>Acceder</h2>
				<fieldset>
					<label htmlFor="email"></label>
					<input
						type="email"
						name="email"
						placeholder="Correo electrónico"
						onChange={(evento) => manejarDatosSesion(evento)}
						/>
					<label htmlFor="password"></label>
					<input
						type="password"
						name="password"
						placeholder="Contraseña"
						onChange={(evento) => manejarDatosSesion(evento)}
						/>
				</fieldset>
				
			</form>
		</div>
		</>
	)
}

export default Login