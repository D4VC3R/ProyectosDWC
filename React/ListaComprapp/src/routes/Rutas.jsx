import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './../pages/Login'
import Inicio from './../pages/Inicio.jsx'
import Error from './../pages/Error.jsx'
import Principal from './../pages/Principal.jsx'
import Gestion from './../pages/Gestion.jsx'
import Creacion from '../pages/Creacion.jsx'
import WrapperProveedores from '../components/WrapperProveedores.jsx'
import PanelAdmin from '../pages/PanelAdmin.jsx'
import ProveedorUsuarios from '../context/ProveedorUsuarios.jsx'

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/" element={<Inicio />}></Route>
				<Route element={<WrapperProveedores />}>
					<Route path="/principal" element={<Principal />}></Route>
					<Route path="/gestion" element={<Gestion />}></Route>
					<Route path="/creacion" element={<Creacion />}></Route>
					<Route
						path="/admin"
						element={
							<ProveedorUsuarios>
								<PanelAdmin />
							</ProveedorUsuarios>
						}
					></Route>
				</Route>
				<Route path="*" element={<Error />}></Route>
			</Routes>
		</>
	)
}

export default Rutas