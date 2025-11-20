import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import InsertarDisco from '../pages/InsertarDisco'
import ListarDiscos from '../pages/ListarDiscos'
import Error from '../pages/Error'

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Inicio />} />
				<Route path="/addDisco" element={<InsertarDisco />} />
				<Route path="/miColección" element={<ListarDiscos />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</>
	)
}

export default Rutas