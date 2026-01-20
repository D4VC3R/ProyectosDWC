import React, {useContext} from 'react'
import { ContextoSesion } from '../context/ProveedorSesion.jsx'


const useSesionContext = () => {

	const contexto = useContext(ContextoSesion);

	if (!contexto) throw new Error("El hook no puede ser utilizado fuera de su proveedor.");

	return contexto;
	
}

export default useSesionContext;