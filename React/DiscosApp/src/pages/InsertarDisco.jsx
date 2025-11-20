import { useState } from 'react';
import discoJson from './../assets/json/disco.json';
import { getMensajesError, getValidador, marcarCampo, comprobarForm } from '../libraries/forms';
import './InsertarDisco.css'

const InsertarDisco = () => {

	const valoresIniciales = discoJson;
	const validador = getValidador();
	const mensajesError = getMensajesError();
	const [disco, setDisco] = useState(valoresIniciales);
	const [errores, setErrores] = useState([]);

	const actualizarDato = (evento) => {
		const {name, value} = evento.target;
		setDisco({...disco, [name]: value});
	}

	const validarDato = (elemento) => {
		const {name, value} = elemento;
		let valido = true;
		if (validador[name]) {
			valido = validador[name](value);
			marcarCampo(elemento, valido);
		}
		return valido;
	}

	const comprobarForm = () => {
		let fallos = []
		
		for (const campo in validador) {
			const valor = disco[campo];
			const elemento = document.forms['formDiscos'].elements[campo]
			if (!validador[campo](valor)){
				fallos = [...fallos, mensajesError[campo]];
				validarDato(elemento);
			}
		}
		setErrores(fallos);
		console.log(fallos.length === 0)
		return fallos.length === 0;
	}

	return (
		<>
			<form name="formDiscos" className="formulario">
				<fieldset>
					<legend>Información del disco</legend>
					<label htmlFor="titulo">Título:</label>
					<input
						type="text"
						name="titulo"
						placeholder="Título del disco..."
						onChange={(evento)=>{
							actualizarDato(evento)
							validarDato(evento.target);
						}}
					/>
					<label htmlFor="interprete">Intérprete:</label>
					<input
						type="text"
						name="interprete"
						placeholder="Grupo / Intérprete"
						onChange={(evento)=>{
							actualizarDato(evento)
							validarDato(evento.target);
						}}
					/>
					<label htmlFor="anyo">Año de publicación:</label>
					<input
						type="text"
						name="anyo"
						placeholder="Año de publicación"
						onChange={(evento)=>{
							actualizarDato(evento)
							validarDato(evento.target);
						}}
					/>
					<label htmlFor="caratula">Carátula:</label>
					<input
						type="url"
						name="caratula"
						placeholder="https://"
						onChange={(evento)=>{
							actualizarDato(evento)
						}}
					/>
				</fieldset>
				<fieldset>
					<legend>Género</legend>
					<select name="genero"
						value={disco.genero}
						onChange={(evento)=>{
							actualizarDato(evento)
							validarDato(evento.target);
						}}>
						{disco.genero === "" && (
                <option value="" hidden disabled>Selecciona...</option>
            )}
						<option value="rock">Rock</option>
						<option value="popEs">Pop español</option>
						<option value="popInt">Pop internacional</option>
						<option value="rap">Rap</option>
						<option value="clasica">Música clásica</option>
						<option value="techno">Techno</option>
						<option value="reggae">Reggae</option>
						<option value="reggaeton">Reggaeton</option>
					</select>
				</fieldset>
				<fieldset>
					<legend>Estado</legend>
					<label htmlFor="prestado">¿Prestado?</label>
					<select name ="prestado">
						<option defaultValue="false">No</option>
						<option value="true">Si</option>
					</select>
					<label htmlFor="localizacion">Localización:</label>
					<input
						type="text"
						name="localizacion"
						placeholder="Formato: ES-000AA"
						onChange={(evento)=>{
							actualizarDato(evento)
							validarDato(evento.target);
						}}

					/>
				</fieldset>
				<fieldset>
					<legend>Acciones</legend>
					<input type="button" value="Guardar" onClick={comprobarForm}></input>
					<input type="button" value="Mostrar"></input>
					<label htmlFor="busqueda">Buscar:</label>
					<input type="text" name="busqueda"/>
					<input type="button" value="Buscar"></input>
					<input type="button" value="Limpiar"></input>
				</fieldset>
				<p className="exito oculto"></p>
			</form>
		</>
	)
}

export default InsertarDisco