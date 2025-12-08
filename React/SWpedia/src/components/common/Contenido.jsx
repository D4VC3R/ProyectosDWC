import React from 'react'
import "./Contenido.css";
import Rutas from '../../routes/Rutas';

const Contenido = ({peliculas}) => {
	return (
		<>
			<div className="contenido_contenido">
				<Rutas peliculas={peliculas} />
			</div>
		</>
	)
}

export default Contenido