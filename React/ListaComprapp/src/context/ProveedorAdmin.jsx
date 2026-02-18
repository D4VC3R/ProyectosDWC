import React, { createContext, useEffect, useState } from 'react'
import useSupabaseCRUD from '../hooks/useSupabaseCRUD';
import useSesionContext from '../hooks/useSesionContext';
import useListContext from '../hooks/useListContext';

const ContextoAdmin = createContext();

const ProveedorAdmin = ({ children }) => {

	const [listaUsuarios, setListaUsuarios] = useState([]);
	const [errorAdmin, setErrorAdmin] = useState('');
	const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

	const { obtenerTodo, actualizar, cargando } = useSupabaseCRUD();
	const {getListasPropias, getListas} = useListContext();
	const { isAdmin, usuario } = useSesionContext();


	const obtenerUsuarios = async () => {
		try {
			if (!isAdmin()) {
				throw new Error("No tienes permisos de administrador");
			}
			const columnas = "id, nombre, avatar, biografia, created_at, roles_usuario!id_rol(id_rol, email, rol)"
			const usuarios = await obtenerTodo('perfil_usuario', columnas);
			
			setListaUsuarios(usuarios);
			setErrorAdmin('');
		} catch (error) {
			manejarFallo(error)
		}
	}

	const obtenerUsuarioPorId = (id) => {
		const usuario = listaUsuarios.find(u => u.id === id);
		setUsuarioSeleccionado(usuario);
		return usuario;
	}

	const obtenerListasDelUsuario = async () => {
    try {
      await getListasPropias(usuarioSeleccionado.id);
    } catch (error) {
			manejarFallo(error)
    }
  };

	const actualizarRol = async (nuevoRol) => {
		try {
			if (usuario.id === usuarioSeleccionado.id) {
				throw new Error("No puedes modificar tu propio rol, bandarra.");
			}
			await actualizar('roles_usuario', 'id_rol', usuarioSeleccionado.roles_usuario.id_rol, { rol: nuevoRol });
			
			const usuarioActualizado = {
				...usuarioSeleccionado,
				roles_usuario: {
					...usuarioSeleccionado.roles_usuario,
					rol: nuevoRol
				}
			};
			setUsuarioSeleccionado(usuarioActualizado);
			
			setListaUsuarios(prevLista => 
				prevLista.map(user => 
					user.id === usuarioSeleccionado.id 
						? usuarioActualizado 
						: user
				)
			);
		} catch (error) {
			manejarFallo(error)
		}
	}

	const manejarFallo = (error) => {
		setErrorAdmin(error.message);
		setTimeout(() => setErrorAdmin(''), 2000);
	}


	useEffect(() => {
		isAdmin() && obtenerUsuarios();
	}, [])

	const exportaciones = {
		listaUsuarios,
		usuarioSeleccionado,
		cargando,
		errorAdmin,
		obtenerUsuarioPorId,
		obtenerListasDelUsuario,
		actualizarRol

	}

	return (
		<ContextoAdmin.Provider value={exportaciones}>
			{children}
		</ContextoAdmin.Provider>
	)
}

export default ProveedorAdmin
export { ContextoAdmin }