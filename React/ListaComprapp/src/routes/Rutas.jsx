import React from 'react'
import { Routes, Route } from 'react-router-dom'
import  Login  from './../pages/Login'
import  Listado  from './../pages/Listado'
import  Inicio  from './../pages/Inicio.jsx'
import Error from './../pages/Error.jsx'
import ListadoProductos from './../pages/ListadoProductos.jsx'
import Principal from './../pages/Principal.jsx'

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path ="/login" element={<Login />}></Route>
				<Route path ="/" element={<Inicio />}></Route>
				<Route path ="/principal" element={<Principal />}>
					<Route path ="/principal/listado" element={<Listado />}></Route>
					<Route path ="/principal//productos" element={<ListadoProductos />}></Route>
				</Route>
				<Route path="*" element={<Error />}></Route>
			</Routes>
		</>
	)
}

export default Rutas