import React from 'react'
import { useNavigate } from 'react-router-dom'


const FiltrarGaleria = () => {

	const navegar = useNavigate();
	// No he implementado el filtrado como nos dijiste, supongo que para eso tendremos que ver los formularios
	// y como recoger los datos. De momento solo navega a las rutas correspondientes.
	return (
		<>
			<div className="filtrarGaleria_menu">
				<button onClick={() => navegar('/galeria/todos')}>Todos los carteles</button>
				<button onClick={() => navegar('/galeria/titulo')}>Por Título</button>
				<button onClick={() => navegar('/galeria/interprete')}>Por Intérprete</button>
				<button onClick={() => navegar('/galeria/director')}>Por Director</button>
			</div>
		</>
	)
}

export default FiltrarGaleria