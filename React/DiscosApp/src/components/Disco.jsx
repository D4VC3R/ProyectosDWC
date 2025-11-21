import React from "react";
import {formatearGenero, formatearEstado} from "./../libraries/forms.js"

const Disco = ({disco}) => {
	let noInfo = "Sin datos."
	return (
		<>
			<div className="disco_disco">
				<div className="disco_imagen">
					<img
						src={disco.cartelera}
						className="disco_caratula"
						alt={disco.titulo ? disco.titulo : noInfo}
					></img>
				</div>
				<div className="disco_contenido">
					<h1 className="disco_titulo">
						{disco.titulo ? disco.titulo : noInfo}
					</h1>
					<h3 className="disco_interprete">
						Interprete: <em>{disco.interprete ? disco.interprete : noInfo}</em>
					</h3>
					<div className="disco_genero">
						Género:	<em>{disco.genero ? formatearGenero(disco.genero) : noInfo}</em>
					</div>
					<div className="disco_anyo">
						Publicación: {disco.anyo ? `Año ${disco.anyo}` : noInfo}
					</div>
					<div className="disco_localizacion">
						Localización: {disco.localizacion ? disco.localizacion : noInfo}
					</div>
					<div className="disco_prestado">
						Prestado: {disco.prestado ? formatearEstado(disco.prestado): noInfo}
					</div>
				</div>
			</div>
		</>
	);
};

export default Disco;
