import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar" }) => {
	
	if (!isOpen) return null;

	const manejarClic = (e) => {
		// Cerrar solo si se hace clic en el overlay, no en el contenido del modal.
		if (e.target.className === 'modal-overlay') onClose();
		// Delegación de eventos para los botones.
		if (e.target.classList.contains('modal-btn-cancel')) onClose();
		if (e.target.classList.contains('modal-btn-confirm')) onConfirm();
		
	};

	return (
		<div className="modal-overlay" onClick={manejarClic}>
			<div className="modal-content">
				<h2 className="modal-title">{title}</h2>
				<p className="modal-message">{message}</p>
				<div className="modal-buttons">
					<span className="modal-btn modal-btn-cancel">
						{cancelText}
					</span>
					<span className="modal-btn modal-btn-confirm">
						{confirmText}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Modal;
