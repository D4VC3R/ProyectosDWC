import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'
// Esto seria algo parecido al controlador de php

const ContextoDiscos = createContext();

const ProveedorDiscos = ({children}) => {
	const [discos, setDiscos] = useState([]);
	const URL = "http://localhost:3000/coleccion";



	return (
		<div>ProveedorDiscos</div>
	)
}

export default ProveedorDiscos