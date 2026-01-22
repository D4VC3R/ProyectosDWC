import React from 'react'
import useSesionContext from '../../hooks/useSesionContext.js'
import { useRef } from 'react';
import Cargando from './Cargando.jsx';

const Login = () => {
	const { manejarCrearCuenta, manejarInicioSesion, manejarDatosSesion, errorUsuario, cargando } = useSesionContext();
	const contenedor = useRef(null);




	const manejarForm = async (e) => {
		e.preventDefault();
		e.target.value === "Iniciar Sesión" && await manejarInicioSesion();
		e.target.value === "Crear Cuenta" && await manejarCrearCuenta();
		e.target.value === "Regístrate" && contenedor.current.classList.add('right-panel-active');
		e.target.value === "Inicia Sesión" && contenedor.current.classList.remove('right-panel-active');
	}

	return (
		<>
			{cargando && <Cargando />}
			<div class="container" id="container" onClick={((e)=>{manejarForm(e)})} ref={contenedor}>
				<div class="form-container sign-up-container">
					<form>
						<h1>Registro</h1>
						<input type="text" placeholder="Name" onChange={(e) => manejarDatosSesion(e)}/>
						<input type="email" placeholder="Email" onChange={(e) => manejarDatosSesion(e)} />
						<input type="password" placeholder="Password" onChange={(e) => manejarDatosSesion(e)}/>
						<button>Crear Cuenta</button>
					</form>
				</div>
				<div class="form-container sign-in-container">
					<form >
						<h1>Acceder</h1>
						<input type="email" placeholder="Email" onChange={(e) => manejarDatosSesion(e)}/>
						<input type="password" placeholder="Password" onChange={(e) => manejarDatosSesion(e)}/>
						<button>Iniciar Sesión</button>
					</form>
				</div>
				<div class="overlay-container">
					<div class="overlay">
						<div class="overlay-panel overlay-left">
							<h1>¡Has vuelto!</h1>
							<p>Inicia sesión con tu email y contraseña</p>
							<button class="ghost" id="signIn">Inicia Sesión</button>
						</div>
						<div class="overlay-panel overlay-right">
							<h1>¡Bienvenido!</h1>
							<p>Haz click en el botón y rellena el formulario para crear una cuenta.</p>
							<button class="ghost" id="signUp">Regístrate</button>
						</div>
					</div>
				</div>
			</div>
			{errorUsuario && <p className="error-mensaje">{errorUsuario}</p>}
		</>
	)
}

export default Login