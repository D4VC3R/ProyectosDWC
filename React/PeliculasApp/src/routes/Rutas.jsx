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
import Galeria from './../pages/Galeria.jsx';
import FiltrarPorDirector from './../pages/submenus/filtrarGaleria/FiltrarPorDirector.jsx';
import FiltrarPorInterprete from './../pages/submenus/filtrarGaleria/FiltrarPorInterprete.jsx';
import FiltrarPorTitulo from './../pages/submenus/filtrarGaleria/FiltrarPorTitulo.jsx';
import SinFiltrar from '../pages/submenus/filtrarGaleria/SinFiltrar.jsx';

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Inicio />} />
				<Route path='/peliculas' element={<Peliculas />} />
				<Route path='/peliculas/detalle/:id' element={<PeliculaDetalle />} />
				<Route path='/interpretes' element={<Interpretes />}/>
				<Route path='/galeria' element={<Galeria />}>
						<Route path='/galeria/todos' element={<SinFiltrar />} />
						<Route path='/galeria/titulo' element={<FiltrarPorTitulo />} />
						<Route path='/galeria/interprete' element={<FiltrarPorInterprete />} />
						<Route path='/galeria/director' element={<FiltrarPorDirector />} />
				</Route>
				<Route path='/contacto' element={<Contacto />} />
				<Route path='/acercade' element={<AcercaDe />} />
				<Route path='/productos' element={<Productos />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</>
	);
};

export default Rutas