import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import InsertarDisco from '../pages/InsertarDisco'
import ListarDiscos from '../pages/ListarDiscos'
import Error from '../pages/Error'
import EnvolverProveedor from '../components/EnvolverProveedor'

const Rutas = () => {
	// Lo he hecho asi para poder envolver solo las rutas que necesitan el contexto del proveedor de discos utilizando un único <Routes>.
	// El componente <Inicio> se podría haber quedado fuera pero viene bien incluirlo para que vaya cargando el contexto nada más iniciar la app
	// y mantener el estado si se navega de nuevo a la página de inicio.
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