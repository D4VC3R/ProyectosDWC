import React from 'react'
import { useContext } from 'react'
import { ContextoListas } from '../context/ProveedorListas'

const useListContext = () => {

	const contexto = useContext(ContextoListas);

	if (!contexto) throw new Error("El hook no puede ser utilizado fuera de su proveedor.");

	return contexto;

}

export default useListContext