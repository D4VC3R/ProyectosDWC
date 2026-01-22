import React from 'react'
import useSesionContext from '../../hooks/useSesionContext.js'
import { useRef } from 'react';
import Cargando from './Cargando.jsx';

const Login = () => {
	const { manejarCrearCuenta, manejarInicioSesion, manejarDatosSesion, errorUsuario, cargando } = useSesionContext();
	const contenedor = useRef(null);


	const manejarForm = async (e) => {
		e.preventDefault();
		e.target.textContent === "Iniciar Sesión" && await manejarInicioSesion();
		e.target.textContent === "Crear Cuenta" && await manejarCrearCuenta();
		e.target.textContent === "Regístrate" && contenedor.current.classList.add('right-panel-active');
		e.target.textContent === "Inicia Sesión" && contenedor.current.classList.remove('right-panel-active');
	}

	return (
		<>
			<div className="login-container">
				<div className="container" id="container" onClick={((e) => { manejarForm(e) })} ref={contenedor}>
					<div className="form-container sign-up-container">
						<form>
							<h1>Registro</h1>
							<input type="text" name="display_name" placeholder="Nombre de usuario" onChange={(e) => manejarDatosSesion(e)} />
							<input type="email" name="email" placeholder="Email" onChange={(e) => manejarDatosSesion(e)} />
							<input type="password" name="password" placeholder="Contraseña" onChange={(e) => manejarDatosSesion(e)} />
							<button>Crear Cuenta</button>
						</form>
					</div>
					<div className="form-container sign-in-container">
						<form >
							<h1>Acceder</h1>
							<input type="email" name="email" placeholder="Email" onChange={(e) => manejarDatosSesion(e)} />
							<input type="password" name="password" placeholder="Contraseña" onChange={(e) => manejarDatosSesion(e)} />
							<button>Iniciar Sesión</button>
						</form>
					</div>
					<div className="overlay-container">
						<div className="overlay">
							<div className="overlay-panel overlay-left">
								<h1>¡Has vuelto!</h1>
								<p>Inicia sesión con tu email y contraseña.</p>
								<button className="ghost">Inicia Sesión</button>
							</div>
							<div className="overlay-panel overlay-right">
								<h1>¡Bienvenido!</h1>
								<p>Haz click en el botón y rellena el formulario para crear una cuenta.</p>
								<button className="ghost">Regístrate</button>
							</div>
						</div>
					</div>
				</div>
					{cargando && <Cargando />}
					{errorUsuario && <p className="error-mensaje">{errorUsuario}</p>}
			</div>

		</>
	)
}

export default Login