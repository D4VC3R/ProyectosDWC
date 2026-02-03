import React from 'react';
import './Modal.css';
import opcionesModal from './../../libraries/utilidades.js';

const Modal = ({ isOpen, onClose, onConfirm, tipo }) => {
	/**
	 * El modal recibe:
	 * isOpen: booleano para saber si se muestra o no el modal.
	 * onClose: la función que se ejecuta al cerrar el modal. La especificamos desde el componente que lo use.
	 * onConfirm: la función que se ejecuta al confirmar la acción en el modal. La especificamos desde el componente que lo use.
	 * tipo: tipo de modal, para seleccionar las opciones adecuadas desde utilidades.js. Si se necesitan más tipos, se añaden allí.
	 */

	const opciones = opcionesModal[tipo];

	const manejarClic = (e) => {
		// Cerrar si se hace clic fuera del contenido del modal
		if (e.target.className === 'modal-overlay') onClose();
		// Delegación de eventos para los botones.
		if (e.target.classList.contains('modal-btn-cancel')) onClose();
		if (e.target.classList.contains('modal-btn-confirm')) onConfirm();
		
	};

	return (
		isOpen && (
		<div className="modal-overlay" onClick={manejarClic}>
			<div className="modal-content">
				<h2 className="modal-title">{opciones.title}</h2>
				<p className="modal-message">{opciones.message}</p>
				<div className="modal-buttons">
					<span className="modal-btn modal-btn-cancel">
						{opciones.cancelText}
					</span>
					<span className="modal-btn modal-btn-confirm">
						{opciones.confirmText}
					</span>
				</div>
			</div>
		</div>
		)
	);
};

export default Modal;
