import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, onClose, className = ''}){
	
	const dialog = useRef();

	// ensure dialog is opened programatically so backdrop shows
	useEffect(() => {
		// store ref in temp value;
		// clean-up will run later than effect fx
		// value store in ref could theoretically change in
		// between fx executions; lock-in value
		// with temp variable
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
			onClose={onClose}
		>
			{children}
		</dialog>
	, document.getElementById('modal'))

}

export default Modal;