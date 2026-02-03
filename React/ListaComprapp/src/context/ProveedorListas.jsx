import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

const ContextoListas = createContext();

const ProveedorListas = ({children}) => {

	// Valores iniciales
	const listadoListasInicial = [];
	const listaInicial = {nombre: ''}

	// Estados
	const [listadoListas, setListadoListas] = useState(listadoListasInicial);
	const [lista, setLista] = useState(listaInicial);


	const exportaciones = {

	}


	return (
		<>
			<ContextoListas.Provider value={exportaciones}>
				{children}
			</ContextoListas.Provider>
		
		</>
	)
}

export default ProveedorListas