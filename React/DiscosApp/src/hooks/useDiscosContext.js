import React, { useContext } from 'react'
import { ContextoDiscos } from '../context/ProveedorDiscos.jsx'


const useDiscosContext = () => {
	const contexto = useContext(ContextoDiscos);

	if (!contexto) 	throw new Error("El hook no puede ser utilizado fuera de su proveedor.");

	return contexto;
	
}

export default useDiscosContext