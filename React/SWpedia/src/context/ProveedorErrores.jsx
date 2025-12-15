import React, {useState, createContext} from 'react'


const ContextoErrores = createContext();

const ProveedorErrores = ({children}) => {

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