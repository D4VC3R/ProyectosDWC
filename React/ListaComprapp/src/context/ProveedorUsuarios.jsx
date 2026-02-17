import React, { createContext, useEffect, useState } from 'react'
import useSupabaseCRUD from '../hooks/useSupabaseCRUD';
import useSesionContext from '../hooks/useSesionContext';

const ContextoUsuarios = createContext();

const ProveedorUsuarios = ({ children }) => {

	const [listaUsuarios, setListaUsuarios] = useState([]);
	const [errorUsuarios, setErrorUsuarios] = useState('');

	const { obtenerTodo, obtenerUno, cargando } = useSupabaseCRUD();
	const { isAdmin } = useSesionContext();


	const obtenerUsuarios = async () => {
		try {
			if (!isAdmin()) {
				throw new Error("No tienes permisos de administrador");
			}

			const perfiles = await obtenerTodo('perfil_usuario');

			// Para cada perfil, obtener su rol
			const usuariosConRol = await Promise.all(
				perfiles.map(async (perfil) => {
					const rol = await obtenerUno('roles_usuario', perfil.id, 'id_rol');
					return {
						id: perfil.id,
						nombre: perfil.nombre,
						avatar: perfil.avatar,
						biografia: perfil.biografia,
						created_at: perfil.created_at,
						email: rol[0]?.email,
						rol: rol[0]?.rol
					};
				})
			);
			setListaUsuarios(usuariosConRol);
			setErrorUsuarios('');
		} catch (error) {
			setErrorUsuarios(error.message);
		}
	}


	useEffect(() => {
		isAdmin() && obtenerUsuarios();
	}, [])

	const exportaciones = {
		listaUsuarios,
		cargando,
		errorUsuarios
	}

	return (
		<ContextoUsuarios.Provider value={exportaciones}>
			{children}
		</ContextoUsuarios.Provider>
	)
}

export default ProveedorUsuarios
export { ContextoUsuarios }