import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import InsertarDisco from '../pages/InsertarDisco'
import ListarDiscos from '../pages/ListarDiscos'
import Error from '../pages/Error'
import ProveedorDiscos from '../context/ProveedorDiscos'

const Rutas = () => {
	return (
		<>
			<ProveedorDiscos>
				<Routes>
					<Route path="/" element={<Inicio />} />
					<Route path="/addDisco" element={<InsertarDisco />} />
					<Route path="/editar/:id" element={<InsertarDisco disco />}/>
					<Route path="/miColección" element={<ListarDiscos />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</ProveedorDiscos>
		</>
	)
}

export default Rutas