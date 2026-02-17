import React from 'react'
import { useNavigate } from 'react-router-dom';
import useUsersContext from '../../hooks/useUsersContext'
import Cargando from '../common/Cargando';
import './ListadoUsers.css'

const ListadoUsers = () => {
	const { listaUsuarios, cargando} = useUsersContext();
	const navegar = useNavigate();

	const manejarClic = (e) => {
		const usuarioId = e.currentTarget.dataset.usuarioId;
		if (usuarioId) {
			navegar(`/usuario/${usuarioId}`);
		}
	};

	return (
		<>
			{cargando ? <Cargando /> :
			<div className='listado-usuarios'>
				{listaUsuarios.length > 0 ? (
					listaUsuarios.map((usuario) => (
						<div
							key={usuario.id}
							className="tarjeta-usuario"
							data-usuario-id={usuario.id}
							onClick={manejarClic}
						>
							<img
								src={usuario.avatar}
								alt={usuario.nombre}
								className="avatar-usuario"
							/>
							<h3>{usuario.nombre}</h3>
							<span className={`rol-badge ${usuario.rol}`}>
								{usuario.rol}
							</span>
						</div>
					))
				) : (
					<p>No hay usuarios disponibles.</p>
				)}
			</div>}
		</>
	)
}

export default ListadoUsers