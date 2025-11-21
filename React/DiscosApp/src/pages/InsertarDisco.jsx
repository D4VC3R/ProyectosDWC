import { useState } from 'react';
import discoJson from './../assets/json/disco.json';
import { getValidador, marcarCampo, comprobarFormObj, isDiscoValido, validar, guardarDisco } from '../libraries/forms';
import './InsertarDisco.css'
import Errores from '../components/Errores';
import { useRef } from 'react';

const InsertarDisco = () => {

	const valoresIniciales = discoJson;
	const validador = getValidador();
	const [disco, setDisco] = useState(valoresIniciales);
	const [errores, setErrores] = useState([]);
	const contenedorExito = useRef(null);
	const form = useRef(null);
	const [camposInvalidos, setCamposInvalidos] = useState({});

	const actualizarDato = (evento) => {
		const {name, value} = evento.target;
		setDisco({...disco, [name]: value});
	}

	const mostrarExito = () => {
		contenedorExito.current.classList.toggle("oculto");
		setTimeout(() => {
      contenedorExito.current?.classList.add("oculto");
    }, 3000);
	}

  const resetForm = () => {
    form.current.reset(); 
    setDisco(valoresIniciales); 
    setErrores([]);
		setCamposInvalidos({});
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

	const comprobar = () => {
    if (isDiscoValido(disco)) {
				setDisco({...disco, id:crypto.randomUUID()})
        mostrarExito();
				guardarDisco(disco);
				resetForm();
    } else {
        const nuevosErrores = comprobarFormObj(disco);
				const camposMal = validar(disco)
        setErrores(nuevosErrores);
				setCamposInvalidos(camposMal);
    }
}

	return (
		<>
			<form name="formDiscos" className="formulario" ref={form}>
				<fieldset>
					<legend>Información del disco</legend>
					<label htmlFor="titulo">Título:</label>
					<input
						type="text"
						className={camposInvalidos.titulo ? "campo-invalido" : ""}
						value={disco.titulo}
						name="titulo"
						placeholder="Título del disco..."
						onChange={(evento)=>{
							actualizarDato(evento);
							validarDato(evento.target);
						}}
					/>
					<label htmlFor="interprete">Intérprete:</label>
					<input
						type="text"
						className={camposInvalidos.interprete ? "campo-invalido" : ""}
						value={disco.interprete}
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
						className={camposInvalidos.anyo ? "campo-invalido" : ""}
						name="anyo"
						value={disco.anyo}
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
						value={disco.caratula}
						placeholder="https://"
						onChange={(evento)=>{
							actualizarDato(evento)
						}}
					/>
				</fieldset>
				<fieldset>
					<legend>Género</legend>
					<select 
						name="genero"
						value={disco.genero}
						className={camposInvalidos.genero ? "campo-invalido" : ""}
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
					<select 
					name="prestado"
					className={camposInvalidos.prestado ? "campo-invalido" : ""} 
					value={disco.prestado}
					onChange={(evento)=>{
						actualizarDato(evento)
					}}>
						<option value="false">No</option>
						<option value="true">Si</option>
					</select>
					<label htmlFor="localizacion">Localización:</label>
					<input
						type="text"
						name="localizacion"
						className={camposInvalidos.localizacion ? "campo-invalido" : ""}
						value={disco.localizacion}
						placeholder="Formato: ES-000AA"
						onChange={(evento)=>{
							actualizarDato(evento)
							validarDato(evento.target);
						}}
					/>
				</fieldset>
				<div className="insetarDisco-errores">
					{errores.length > 0 && <Errores errores={errores} />}
				</div>
				<fieldset>
					<legend>Acciones</legend>
					<input type="button" value="Guardar" className="botonForm" onClick={comprobar}></input>
				</fieldset>
				<p className="exito oculto" ref={contenedorExito}>
					Disco añadido correctamente.
				</p> 
			</form>
		</>
	)
}

export default InsertarDisco