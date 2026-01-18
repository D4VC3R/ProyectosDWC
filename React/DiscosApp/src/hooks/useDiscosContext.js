import React, { useContext } from 'react'
import { ContextoDiscos } from '../context/ProveedorDiscos.jsx'


const useDiscosContext = () => {
	// El intermediario entre el contexto y los componentes que lo utilizan.
	const contexto = useContext(ContextoDiscos);

	if (!contexto) 	throw new Error("El hook no puede ser utilizado fuera de su proveedor.");

	return contexto;
	
}

export default useDiscosContext