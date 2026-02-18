import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './../pages/Login'
import Inicio from './../pages/Inicio.jsx'
import Error from './../pages/Error.jsx'
import Principal from './../pages/Principal.jsx'
import Gestion from './../pages/Gestion.jsx'
import Creacion from '../pages/Creacion.jsx'
import WrapperListasProductos from '../components/WrapperListasProductos.jsx'
import PanelAdmin from '../pages/PanelAdmin.jsx'
import WrapperAdmin from '../components/WrapperAdmin.jsx'
import DetallesUser from '../components/users/DetallesUser.jsx'

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/" element={<Inicio />}></Route>
				<Route element={<WrapperListasProductos />}>
					<Route path="/principal" element={<Principal />}></Route>
					<Route path="/gestion" element={<Gestion />}></Route>
					<Route path="/creacion" element={<Creacion />}></Route>
					<Route element ={<WrapperAdmin />}>
						<Route path="/admin" element={<PanelAdmin />}></Route>
						<Route path="/admin/:id" element={<DetallesUser />}></Route>
					</Route>
				</Route>
				<Route path="*" element={<Error />}></Route>
			</Routes>
		</>
	)
}

export default Rutas