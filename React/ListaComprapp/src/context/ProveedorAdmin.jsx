import React, { createContext, useEffect, useState } from 'react'
import useSupabaseCRUD from '../hooks/useSupabaseCRUD';
import useSesionContext from '../hooks/useSesionContext';
import useListContext from '../hooks/useListContext';


const ContextoAdmin = createContext();

const ProveedorAdmin = ({ children }) => {

	// Estados
	const [listaUsuarios, setListaUsuarios] = useState([]); // Al montar el componente admin, se cargan todos los usuarios y se guardan en este estado. 
	const [errorAdmin, setErrorAdmin] = useState('');
	const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Al hacer clic en un usuario registrado, guardamos su información en este estado.
	const [vista, setVista] = useState('usuarios'); // Como el panel de admin tiene varias vistas, con este estado controlo cuál se está mostrando.

	const { obtenerTodo, actualizar, cargando } = useSupabaseCRUD();
	const { getListasConPropietario } = useListContext();
	const { isAdmin, usuario } = useSesionContext();


	// Obtener todos los usuarios (más bien, su perfil) junto con su rol, asi ya tengo toda la información relativa al usuario que necesito, listas a parte.
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

	// Como tenemos todos los usuarios cargados, con está función identificamos al usuario seleccionado por su ID y guardamos su información en el estado usuarioSeleccionado, para que la página de detalles pueda mostrar su información.
	const obtenerUsuarioPorId = (id) => {
		const usuario = listaUsuarios.find(u => u.id === id);
		setUsuarioSeleccionado(usuario);
		return usuario;
	}

	const limpiarUsuarioSeleccionado = () => {
		setUsuarioSeleccionado(null);
	}

	// Necesitamos ver solo las listas que pertenecen al usuario en la página de detallesUser, con esta función obtenemos esas listas filtradas por el ID del propietario.
	const obtenerListasDelUsuario = async () => {
		try {
			// getListasConPropietario es una función del ListContext que hace una consulta a supabase para obtener las listas filtradas por el ID del propietario,
			// pero con un join para traer también el nombre del propietario en vez de solo su ID, ya que en la página de detalles queremos mostrar esa información.
			await getListasConPropietario(usuarioSeleccionado.id);
		} catch (error) {
			manejarFallo(error)
		}
	};

	// Comprobamos que el admin no sea un suicida y actualizamos el rol. De nuevo, las restricciones de permisos están puestas en Supabase.
	const actualizarRol = async (nuevoRol) => {
		try {
			if (!isAdmin()) {
				throw new Error("¿Como has llegado hasta aquí?");
			}
			if (usuario.id === usuarioSeleccionado.id) {
				throw new Error("No puedes modificar tu propio rol, bandarra.");
			}
			await actualizar('roles_usuario', 'id_rol', usuarioSeleccionado.roles_usuario.id_rol, { rol: nuevoRol });
			// Tras actualizar el rol en la base de datos, actualizamos el estado para que se refleje el cambio inmediatamente sin recargar nada.
			const usuarioActualizado = {
				...usuarioSeleccionado,
				roles_usuario: {
					...usuarioSeleccionado.roles_usuario,
					rol: nuevoRol
				}
			};
			setUsuarioSeleccionado(usuarioActualizado);
			// Por supuesto, también hay que actualizar la información en la lista de usuarios.
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

	const verProductos = () => setVista('productos');
	const verUsuarios = () => setVista('usuarios');
	const verListas = () => setVista('listas');

	// En cuanto se monta el componente al entrar en cualquier ruta de administración, nos traemos todos los usuarios.
	useEffect(() => {
		isAdmin() && obtenerUsuarios();
	}, [])

	const exportaciones = {
		listaUsuarios,
		usuarioSeleccionado,
		cargando,
		errorAdmin,
		vista,
		verProductos,
		verUsuarios,
		verListas,
		obtenerUsuarioPorId,
		obtenerListasDelUsuario,
		actualizarRol,
		limpiarUsuarioSeleccionado,
	}

	return (
		<ContextoAdmin.Provider value={exportaciones}>
			{children}
		</ContextoAdmin.Provider>
	)
}

export default ProveedorAdmin
export { ContextoAdmin }