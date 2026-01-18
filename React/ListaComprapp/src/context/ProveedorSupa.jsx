import React, {createContext, useContext, useState, useEffect} from 'react'

const SupabaseContext = createContext();

const ProveedorSupa = ({children}) => {

	const [productos, setProductos] = useState([]);








	const exportaciones = {
		productos,
	}


	return (
		<SupabaseContext.Provider value = {exportaciones}>
			{children}
		</SupabaseContext.Provider>
	)
}

export default ProveedorSupa