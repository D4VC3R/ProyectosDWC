import React, { createContext, useEffect, useState } from 'react'
import useSupabaseCRUD from '../hooks/useSupabaseCRUD';
import useSesionContext from '../hooks/useSesionContext';

const ContextoUsuarios = createContext();

const ProveedorUsuarios = ({ children }) => {

	const [listaUsuarios, setListaUsuarios] = useState([]);
	const [errorUsuarios, setErrorUsuarios] = useState('');
	const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
	const [listasUsuario, setListasUsuario] = useState([]);

	const { obtenerTodo, obtenerUno, cargando } = useSupabaseCRUD();
	const { isAdmin } = useSesionContext();


	const obtenerUsuarios = async () => {
		try {
			if (!isAdmin()) {
				throw new Error("No tienes permisos de administrador");
			}
			const perfiles = await obtenerTodo('perfil_usuario');

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

	const obtenerUsuarioPorId = (id) => {
		const usuario = listaUsuarios.find(u => u.id === id);
		setUsuarioSeleccionado(usuario);
		return usuario;
	}

	const obtenerListasDelUsuario = async () => {
    try {
      const listas = await obtenerRelacionados(
        'listas_compra',
        'id_propietario',
        usuarioSeleccionado.id,
        'id, nombre, created_at'
      );
      setListasUsuario(listas);
    } catch (error) {
			setErrorUsuarios(error.message);
      setListasUsuario([]);
    }
  };


	useEffect(() => {
		isAdmin() && obtenerUsuarios();
	}, [])

	const exportaciones = {
		listaUsuarios,
		usuarioSeleccionado,
		cargando,
		errorUsuarios,
		listasUsuario,
		obtenerUsuarioPorId,
		obtenerListasDelUsuario

	}

	return (
		<ContextoUsuarios.Provider value={exportaciones}>
			{children}
		</ContextoUsuarios.Provider>
	)
}

export default ProveedorUsuarios
export { ContextoUsuarios }