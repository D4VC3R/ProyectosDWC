import React from 'react'
import { Routes, Route } from 'react-router-dom'

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path ="/" element={<Inicio />}></Route>
				<Route path ="/login" element={<Login />}></Route>
				<Route path ="/listado" element={<Listado />}></Route>
			</Routes>
		</>
	)
}

export default Rutas