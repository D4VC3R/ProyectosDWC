import React from 'react'
import { useNavigate } from 'react-router-dom'
import useSesionContext from '../hooks/useSesionContext'
import tarjetas from '../assets/json/tarjetas.json';
import './Inicio.css';

const Inicio = () => {
	const navegar = useNavigate();
	const { sesionIniciada, usuario, isAdmin } = useSesionContext();

	const obtenerTarjetas = () => {
		if (!sesionIniciada) {
			return tarjetas.publicas;
		}
		return isAdmin()
			? [...tarjetas.usuario, ...tarjetas.admin]
			: tarjetas.usuario;
	};

	const tarjetasActuales = obtenerTarjetas();

	// Dependiendo de si ha iniciado sesión, el usuario verá unas cosas u otras.
	return (
		<div className="inicio-container">
			{!sesionIniciada ? (
				<>
					<h2 className="inicio-titulo">Bienvenido a ListaComprapp</h2>
					<p className="inicio-subtitulo">Organiza tus compras de forma inteligente</p>
				</>
			) : (
				<>
					<h2 className="inicio-titulo">
						Bienvenido de nuevo{usuario.nombre && `, ${usuario.nombre}`}
					</h2>
					<p className="inicio-subtitulo">¿Qué deseas hacer hoy?</p>
				</>
			)}

			<div className="tarjetas-grid">
				{tarjetasActuales.map((tarjeta, i) => (
					<div
						key={i}
						className="tarjeta-opcion"
						onClick={() => navegar(tarjeta.ruta)}
					>
						<div className="tarjeta-imagen-container">
							<img
								src={tarjeta.imagen}
								alt={tarjeta.titulo}
								className="tarjeta-imagen"
							/>
							<div className="tarjeta-overlay"></div>
						</div>
						<div className="tarjeta-contenido" style={{ '--color-tarjeta': tarjeta.color }}>
							<h3 className="tarjeta-titulo">{tarjeta.titulo}</h3>
							<p className="tarjeta-descripcion">{tarjeta.descripcion}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Inicio