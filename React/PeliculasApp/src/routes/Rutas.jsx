import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Inicio from './../pages/Inicio.jsx';
import Contacto from './../pages/Contacto.jsx';
import AcercaDe from './../pages/AcercaDe.jsx';
import Productos from './../pages/Productos.jsx';
import Error from './../pages/Error.jsx';
import Peliculas from './../pages/Peliculas.jsx';
import PeliculaDetalle from './../pages/PeliculaDetalle.jsx';
import Interpretes from '../pages/Interpretes.jsx';
import InterpreteDetalle from '../pages/InterpreteDetalle.jsx';
import Galeria from './../pages/Galeria.jsx';

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Inicio />} />
				<Route path='/peliculas' element={<Peliculas />}>
					<Route path='/peliculas/detalle' element={<PeliculaDetalle />} />
				</Route>
				<Route path='/interpretes' element={<Interpretes />}>
					<Route path='/interpretes/detalle' element={<InterpreteDetalle />} />
				</Route>
				<Route path='galeria' element={<Galeria />} />
				<Route path='/contacto' element={<Contacto />} />
				<Route path='/acercade' element={<AcercaDe />} />
				<Route path='/productos' element={<Productos />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</>
	);
};

export default Rutas