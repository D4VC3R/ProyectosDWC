import React from 'react'
import "./Taquilla.css";

const Taquilla = (props) => {
	// En este componente solo muesto la recaudación y le doy un estilo básico,
	// luego en el css de Pelicula.jsx lo muestro utilizando useRef y toggle.

	return (
		<div className="taquilla_taquilla">
			<span>Recaudación:</span> <em>{props.recaudacion}</em>
		</div>
	)
}

export default Taquilla