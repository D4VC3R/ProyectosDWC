import React from 'react'
import { useNavigate } from 'react-router-dom'
import useSesionContext from '../hooks/useSesionContext'
import tarjetas from '../assets/json/tarjetas.json';
import './Inicio.css';
import TarjetaMenu from '../components/common/TarjetaMenu';

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

	const manejarClic = (e) => {
		const ruta = e.target.closest('.tarjeta-opcion')?.dataset.ruta;
		if (ruta) {
			navegar(ruta);
		}
	};
	// Esto estaría mejor con un estado + useEffect en el contexto de sesión, en el proyecto prometo no hacer estas cochinadas.
	const tarjetasActuales = obtenerTarjetas();
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
					<TarjetaMenu key={i} tarjeta={tarjeta}/>
				))}
			</div>
		</div>
	)
}

export default Inicio