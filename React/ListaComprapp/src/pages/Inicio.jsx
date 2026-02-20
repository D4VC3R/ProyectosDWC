import React from 'react'
import { useNavigate } from 'react-router-dom'
import useSesionContext from '../hooks/useSesionContext'
import tarjetas from '../assets/json/tarjetas.json';
import './Inicio.css';

const Inicio = () => {
	const navegar = useNavigate();
	const { sesionIniciada, usuario, isAdmin } = useSesionContext();

	// Si no hay sesión iniciada, se muestran las tarjetas públicas. Si la hay, se muestran las de usuario y, si es admin, también las de admin.
	const obtenerTarjetas = () => {
		if (!sesionIniciada) {
			return tarjetas.publicas;
		}
		return isAdmin()
			? [...tarjetas.usuario, ...tarjetas.admin]
			: tarjetas.usuario;
	};

	const tarjetasActuales = obtenerTarjetas();
	const manejarClic = (e) => {
		const ruta = e.target.closest('.tarjeta-opcion')?.dataset.ruta;
		if (ruta) {
			navegar(ruta);
		}
	};

	return (
		<div className="inicio-container">
			{!sesionIniciada ? (
				<>
					<h2 className="inicio-titulo">Bienvenido a Mi Compra</h2>
					<p className="inicio-subtitulo">Inicia sesión para aprovechar al máximo la app</p>
				</>
			) : (
				<>
					<h2 className="inicio-titulo">
						Bienvenido de nuevo{usuario.nombre && `, ${usuario.nombre}.`}
					</h2>
					<p className="inicio-subtitulo">Elige una de las infinitas opciones para comenzar.</p>
				</>
			)}

			<div className="tarjetas-grid" onClick={(e) => manejarClic(e)}>
				{tarjetasActuales.map((tarjeta, i) => (
					<div
						key={i}
						className="tarjeta-opcion"
						data-ruta={tarjeta.ruta}
					>
						<div className="tarjeta-imagen-container" >
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