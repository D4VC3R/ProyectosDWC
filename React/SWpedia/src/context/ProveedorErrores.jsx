import React, {useState, createContext} from 'react'


const ContextoErrores = createContext();

const ProveedorErrores = ({children}) => {

	// Esto lo tengo a medias a falta de hacer un componente que muestre los errores.
	const [error, setError] = useState("");

	const limpiarError = () => {
		setError("");
	}
	const addError = (mensaje) => {
		setError(mensaje);
	}

	const exportaciones = {error, limpiarError, addError};


	return (
		<ContextoErrores value={exportaciones}>{children}</ContextoErrores>
	)
}

export default ProveedorErrores;
export {ContextoErrores};