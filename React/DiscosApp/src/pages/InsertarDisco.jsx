import { useState } from 'react';
import discoJson from './../assets/json/disco.json';

const InsertarDisco = () => {

	const valoresIniciales = discoJson;

	const [disco, setDisco] = useState(valoresIniciales);

	const actualizarDato = (evento) => {
		const {name, value} = evento.target;
		setDisco({...disco, [name]: value});
	}

	const validarDato = (elemento) => {
		const {name, value} = elemento;
	}

	console.log(disco);


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
						}}
					/>
					<label htmlFor="interprete">Intérprete:</label>
					<input
						type="text"
						name="interprete"
						placeholder="Grupo / Intérprete"
						onChange={(evento)=>{
							actualizarDato(evento)
						}}
					/>
					<label htmlFor="anyo">Año de publicación:</label>
					<input
						type="number"
						step="1"
						min="1900"
						name="anyo"
						placeholder="Año de publicación"
						onChange={(evento)=>{
							actualizarDato(evento)
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
						onChange={(evento)=>{
							actualizarDato(evento)
						}}>
						<option defaultValue={""} disabled  hidden>Seleciona...</option>
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
					<select onChange={(evento)=>{
							actualizarDato(evento)
						}}>
						<option defaultValue="false">No</option>
						<option value="true">Si</option>
					</select>
					<label htmlFor="localizacion">Localización:</label>
					<input
						type="text"
						name="localizacion"
						placeholder="Formato: ES-000AA"
					/>
				</fieldset>
				<ul className="error oculto" id="errores"></ul>
				<fieldset>
					<legend>Acciones</legend>
					<input type="button" value="Guardar"></input>
					<input type="button" value="Mostrar"></input>
					<label htmlFor="busqueda">Buscar:</label>
					<input type="text"
					name="busqueda"/>
					<input type="button" value="Buscar"></input>
					<input type="button" value="Limpiar"></input>
				</fieldset>
				<p className="exito oculto"></p>
			</form>
		</>
	)
}

export default InsertarDisco