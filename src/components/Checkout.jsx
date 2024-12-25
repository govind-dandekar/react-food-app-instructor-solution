import { use } from "react";
import { CartContext } from "../store/CartContext";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "../store/UserProgressContext";

function Checkout(){
	const { items } = use(CartContext)
	const { progress, hideCheckout } = use(UserProgressContext)

	const cartTotal = items.reduce((totalPrice, item) => 
		totalPrice + item.price * item.quantity, 0
	)

	function handleCheckoutClose(){
		hideCheckout();
	}

	function handleFormSubmit(event){
		event.preventDefault();

		const fd = new FormData(event.target);

		// returns {name: entered name}
		const customerData = Object.fromEntries(fd.entries());

		const response = fetch('http://localhost:3000/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				order: {
					items: items,
					customer: customerData
				}
			})
		})
	}
	
	return (
		<Modal 
			open={progress === 'checkout'}
			onClose={handleCheckoutClose}>
			<form onSubmit={handleFormSubmit}>
				<h2>Checkout</h2>
				<Input 
					labelText="Full Name"
					type="text"
					id="name"
				/>
				<Input 
					labelText="Email Address"
					type="email"
					id="email"
				/>
				<Input 
					labelText="Street Address"
					type="text"
					id="street"
				/>
				<div className="control-row">
					<Input 
						labelText="Postal Code"
						type="text"
						id="postal-code"
					/>
					<Input 
						labelText="City"
						type="text"
						id="city"
					/>
				</div>
				<p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
				<p className='modal-actions'>
					<Button 
						type="button" 
						textOnly
						onClick={handleCheckoutClose}>
							Close
					</Button>
					<Button>Submit Order</Button>
				</p>
			</form>
		</Modal>
	)
}

export default Checkout;