import React, {useContext} from 'react'
import { ContextoAdmin } from '../context/ProveedorAdmin.jsx'


const useAdminContext = () => {

	const contexto = useContext(ContextoAdmin);

	if (!contexto) throw new Error("El hook no puede ser utilizado fuera de su proveedor.");

	return contexto;
	
}

export default useAdminContext;