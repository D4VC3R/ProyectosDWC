import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import InsertarDisco from '../pages/InsertarDisco'
import ListarDiscos from '../pages/ListarDiscos'
import Error from '../pages/Error'
import EnvolverProveedor from '../components/EnvolverProveedor'

const Rutas = () => {


	return (
		<>
			<Routes>
				<Route element={<EnvolverProveedor />}>
					<Route path="/" element={<Inicio />} />
					<Route path="/addDisco" element={ <InsertarDisco />} />
					<Route path="/editar/:id" element={ <InsertarDisco />} />
					<Route path="/miColección" element={ <ListarDiscos />} />
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</>
	)
}

export default Rutas