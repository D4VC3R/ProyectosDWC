import { useState, useEffect, useRef } from 'react';
import discoJson from './../assets/json/disco.json';
import { getValidador, marcarCampo, comprobarFormObj, isDiscoValido, validar } from '../libraries/forms';
import useDiscosContext from '../hooks/useDiscosContext.js';
import './InsertarDisco.css'
import Errores from '../components/Errores';
import Cargando from '../components/common/Cargando';
import { useNavigate, useParams } from 'react-router-dom';

const InsertarDisco = () => {

	const valoresIniciales = discoJson;
	const validador = getValidador();
	const [disco, setDisco] = useState(valoresIniciales);
	const [errores, setErrores] = useState([]);
	const [camposInvalidos, setCamposInvalidos] = useState({});
	const contenedorExito = useRef(null);
	const form = useRef(null);
	const botonGuardar = useRef(null);
	const { guardarDisco, cargando, getDisco, editarDisco } = useDiscosContext();
	let { id } = useParams();
	const navegar = useNavigate();

	const actualizarDato = (evento) => {
		const { name, value } = evento.target;
		setDisco({ ...disco, [name]: value });
	}

	const validarDato = (elemento) => {
		const { name, value } = elemento;
		let valido = true;
		if (validador[name]) {
			valido = validador[name](value);
			marcarCampo(elemento, valido);
		}
		return valido;
	}

	// Desaparece solo, pero hay que asegurarse de que el contenedor sigue ahí cuando acaba el timeout, si no, si cambiabas rápido al listado de discos daba un fallo en consola.
	const mostrarExito = () => {
		contenedorExito.current.classList.toggle("oculto");
		setTimeout(() => {
			contenedorExito.current?.classList.add("oculto");
		}, 4000);
	}

	// Devolvemos todo a sus valores iniciales.
	const resetForm = () => {
		form.current.reset();
		setDisco(valoresIniciales);
		setErrores([]);
		setCamposInvalidos({});
	}

	const manejarErrores = () => {
		const nuevosErrores = comprobarFormObj(disco);
		const camposMal = validar(disco)
		setErrores(nuevosErrores);
		setCamposInvalidos(camposMal);
	}

	// La lógica para cuando creas un nuevo disco.
	const manejarCreacion = async () => {
		try {
			await guardarDisco(disco);
			mostrarExito();
			resetForm();
		} catch (error) {
			setErrores(error.message);
		}
	};
	// La lógica para cuando editas un disco existente, como no he sabido limpiar la url pues navego a la lista de discos tras guardar los cambios y 'apañao'.
	const manejarEdicion = async () => {
		try {
			await editarDisco(disco, id);
			mostrarExito();
			setTimeout(() => {
				navegar('/miColección');
			}, 500);
		} catch (error) {
			setErrores(error.message);
		}
	}

	// Hago el return para evitar anidar mucho código con comprobaciones if/else como isDiscoValido && id, isDiscoValido && !id, etc.
	const comprobar = async () => {
		if (!isDiscoValido(disco)) {
			manejarErrores();
			return;
		}

		if (id) {
			await manejarEdicion();
		} else {
			await manejarCreacion();
		}
	};

	// Si accedemos con un id en la url, cargamos el disco a editar. 
	// Lo que no veo es porque no muestra "Guardar cambios" en el botón, si hago console.log del valor de botonGuardar.current.value aquí dentro me sale el valor correcto...
	const cargarDisco = async () => {
		if (id) {
			const discoAEditar = await getDisco(id);
			botonGuardar.current.value = "Guardar cambios";
			setDisco(discoAEditar);
		} else {
			setDisco(valoresIniciales);
		}
	};

	useEffect(() => {
		cargarDisco();
	}, [id, getDisco]);

	// He tratado de varias maneras utilizar delegación de eventos para manejar los cambios en los inputs del formulario,
	// pero no he conseguido que funcione correctamente, así que al final he optado por dejar el onChange en cada input, no me gusta pero funciona.
	return (
		<>
			<div className="insertarDisco-container">
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
							onChange={(evento) => {
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
							onChange={(evento) => {
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
							onChange={(evento) => {
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
							onChange={(evento) => {
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
							onChange={(evento) => {
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
							onChange={(evento) => {
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
							onChange={(evento) => {
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
						<input type="button" value="Guardar" className="botonForm" onClick={comprobar} ref={botonGuardar}></input>
					</fieldset>
					<div className="exito oculto" ref={contenedorExito}>
						{cargando ? <Cargando /> : <p>{"Disco guardado correctamente."}</p>}
					</div>
				</form>
			</div>

		</>
	)
}

export default InsertarDisco