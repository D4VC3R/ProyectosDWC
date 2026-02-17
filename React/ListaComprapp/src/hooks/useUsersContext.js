import React, {useContext} from 'react'
import { ContextoUsuarios } from '../context/ProveedorUsuarios.jsx'


const useUsersContext = () => {

	const contexto = useContext(ContextoUsuarios);

	if (!contexto) throw new Error("El hook no puede ser utilizado fuera de su proveedor.");

	return contexto;
	
}

export default useUsersContext;