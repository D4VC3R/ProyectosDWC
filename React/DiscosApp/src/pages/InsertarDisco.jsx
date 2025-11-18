import React from 'react'
import disco from './../assets/disco.json';

const InsertarDisco = () => {

  const valoresIniciales = disco;
	console.log(valoresIniciales);
	return (
		<>
		<form name="formDiscos" class="formulario">
			<fieldset id ="infoDisco">
				<legend>Información del disco</legend>
				<label for="titulo">Título:</label>
				<input
					type="text"
					name="titulo"
					id="titulo"
					placeholder="Título del disco..."
				/>
				<label for="interprete">Intérprete:</label>
				<input
					type="text"
					name="interprete"
					id="interprete"
					placeholder="Grupo / Intérprete"
				/>
				<label for="anyo">Año de publicación:</label>
				<input
					type="number"
					step="1"
					min="1900"
					name="anyo"
					id="anyo"
					placeholder="Año de publicación"
				/>
				<label for="caratula">Carátula:</label>
				<input
					type="url"
					name="caratula"
					id="caratula"
					placeholder="https://"
				/>
			</fieldset>
			<fieldset id="infoGenero">
				<legend>Género</legend>
				<select id="selectGenero" name="genero">
					<option value="" disabled selected hidden>Seleciona...</option>
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
			<fieldset id="estadoDisco">
				<legend>Estado</legend>
				<label for="prestado">¿Prestado?</label>
				<select id="prestado">
					<option value="false" selected>No</option>
					<option value="true">Si</option>
				</select>
				<label for="localizacion">Localización:</label>
				<input
					type="text"
					name="localizacion"
					id="localizacion"
					placeholder="Formato: ES-000AA"
				/>
			</fieldset>
			<ul class="error oculto" id="errores"></ul>
			<fieldset id="botonesForm">
				<legend>Acciones</legend>
				<input type="button">Guardar</input>
				<input type="button">Mostrar</input>
				<label for="busqueda">Buscar:</label>
				<input type="text"
				id="busqueda"
				name="busqueda"/>
				<input type="button">Buscar</input>
				<input type="button">Limpiar</input>
			</fieldset>
			<p class="exito oculto" id="exito"></p>
		</form>
		</>
	)
}

export default InsertarDisco