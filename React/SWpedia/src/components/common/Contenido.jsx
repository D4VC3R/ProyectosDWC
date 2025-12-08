import React from 'react'
import Contenedor from './Contenedor'
import "./Contenido.css";
import Rutas from '../../routes/Rutas';

const Contenido = ({peliculas}) => {
	// Componente para mostrar el contenido principal de la página.
	return (
		<>
			<div className="contenido_contenido">
				<Rutas peliculas={peliculas} />
			</div>
		</>
	)
}

export default Contenido