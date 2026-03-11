import React from 'react'

const TarjetaMenu = ({ tarjeta }) => {
	return (
		<>
			<div className="tarjeta-opcion" data-ruta={tarjeta.ruta}>
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
		</>
	)
}

export default TarjetaMenu