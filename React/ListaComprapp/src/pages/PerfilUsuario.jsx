import React, { useState, useEffect } from 'react'
import useSesionContext from '../hooks/useSesionContext'
import useListContext from '../hooks/useListContext'
import ListadoListas from '../components/lists/ListadoListas'
import { formatearFecha } from '../libraries/utilidades.js'
import './PerfilUsuario.css'

const PerfilUsuario = () => {

	const { usuario, actualizarUsuario, sesionIniciada, isAdmin } = useSesionContext();
	const { listas, getListasPropias } = useListContext();

	const [usuarioEditado, setUsuarioEditado] = useState(usuario);
	const [editando, setEditando] = useState(false);

	const manejarDatosUsuario = (evento) => {
		const { name, value } = evento.target;
		setUsuarioEditado({
			...usuarioEditado,
			[name]: value
		});
	}

	const manejarClic = (e) => {
		e.target.tagName === "H3" && setEditando(true);
		editando === true && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT" && setEditando(false);
	}

	// Comprobar si algo ha cambiado para evitar llamadas cada vez que se pulsa en el botón de editar.
	const hayCambios = () => {
		return (
			usuario?.nombre !== usuarioEditado?.nombre?.trim() ||
			usuario?.avatar !== usuarioEditado?.avatar ||
			usuario?.biografia !== usuarioEditado?.biografia
		);
	}

	// Si dejas de editar y algo ha cambiado, se guardan los cambios automaticamente.
	useEffect(() => {
		if (!editando && hayCambios()) {
			actualizarUsuario(usuarioEditado);
		}
	}, [editando])

	// Al cargar un perfil en concreto, nos aseguramos de que el estado listas contenga solo las listas de ese usuario.
	// Para el usuario normal no es necesario pero para el admin viene bien asegurarse.
	// Como me he empeñado en un solo estado para las listas, tengo que hacer este tipo de comprobaciones...
	useEffect(()=>{
		sesionIniciada && isAdmin() && getListasPropias();
	}, []);
	

	return (
		<div className="usuario-detalle" onClick={((e) => { manejarClic(e) })}>
			<div className="grid-container">
				<div className="columna-usuario">
					<div className="usuario-card">
						<div className="usuario-header">
							<img
								src={usuarioEditado.avatar || usuario?.avatar}
								alt={usuarioEditado.nombre || usuario?.nombre}
								className="usuario-avatar-grande"
							/>
							<div className="usuario-info-principal">
								<h1>{usuarioEditado.nombre || usuario?.nombre}</h1>
								<span className={`rol-badge ${usuario?.roles_usuario?.rol}`}>
									{usuario?.roles_usuario?.rol}
								</span>
								<p><strong>Email: </strong>
									{usuario?.roles_usuario?.email}</p>

								<p><strong>Fecha de registro: </strong>
									{formatearFecha(usuario?.created_at)}</p>

							</div>
						</div>
						<form className="info-seccion">
							<h3>Editar Perfil</h3>
							<p><strong>Nombre de usuario:</strong></p>
							<div className="campo-edicion">
								<input
									type="text"
									name="nombre"
									value={usuarioEditado.nombre}
									onChange={manejarDatosUsuario}
									className="input-edicion-nombre"
									disabled={!editando}
								/>
							</div>

							<div className="campo-edicion">
								<p><strong>Avatar URL:</strong></p>
								<input
									type="text"
									name="avatar"
									value={usuarioEditado.avatar}
									onChange={manejarDatosUsuario}
									className="input-edicion"
									placeholder="URL de tu avatar"
									disabled={!editando}
								/>
							</div>

							<div className="biografia-seccion">
								<strong>Biografía:</strong>
								<textarea
									name="biografia"
									value={usuarioEditado.biografia || ''}
									onChange={manejarDatosUsuario}
									className="textarea-edicion"
									rows="4"
									placeholder="Cuéntate algo..."
									disabled={!editando}
								/>
							</div>
						</form>
					</div>
				</div>

				<div className="columna-listas">
					<h2>Mis Listas de Compra ({listas?.length || 0})</h2>
					<ListadoListas />
				</div>
			</div>
		</div>
	)
}

export default PerfilUsuario