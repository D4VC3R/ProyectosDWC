import React, { useState } from 'react'
import useSesionContext from '../../hooks/useSesionContext'
import Modal from './Modal'
import './CerrarSesion.css'

const CerrarSesion = () => {

	const { manejarCierreSesion, sesionIniciada } = useSesionContext();
	const [modalOpen, setModalOpen] = useState(false);

	// Abrir la ventana modal para confirmar el cierre de sesión.
	const abrirModal = (e) => {
		e.preventDefault();
		setModalOpen(true);
	}

	const confirmarCierreSesion = async () => {
		await manejarCierreSesion();
		setModalOpen(false);
	}

	const cancelarCierreSesion = () => {
		setModalOpen(false);
	}

	return (
		<>
			{sesionIniciada &&
				<>
					<span className='cerrarSesion' onClick={abrirModal}>Cerrar Sesión</span>
					<Modal
						isOpen={modalOpen}
						onClose={cancelarCierreSesion}
						onConfirm={confirmarCierreSesion}
						tipo="cerrarSesion"
					/>
				</>
			}
		</>
	)
}

export default CerrarSesion