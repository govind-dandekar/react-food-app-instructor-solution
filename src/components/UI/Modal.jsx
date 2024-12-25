import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = ''}){
	
	const dialog = useRef();

	// ensure dialog is opened programatically so backdrop shows
	useEffect(() => {
		const modal = dialog.current;
		
		if (open) {
			modal.showModal();
		}

		// clean-up fx that runs whenever dependency changes
		return () => modal.close();
	}, [open]);
	
	return createPortal(
		<dialog
			ref={dialog}
			className={`modal ${className}`}	
		>
			{children}
		</dialog>
	, document.getElementById('modal'))

}

export default Modal;