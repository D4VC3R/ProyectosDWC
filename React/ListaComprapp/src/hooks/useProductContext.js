import React from 'react'
import { useContext } from 'react'
import { ContextoProductos } from '../context/ProveedorProductos'

const useProductContext = () => {

	const contexto = useContext(ContextoProductos);

	if (!contexto) throw new Error("El hook no puede ser utilizado fuera de su proveedor.");

	return contexto;

}

export default useProductContext