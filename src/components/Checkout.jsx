import { use, useActionState } from "react";
import { CartContext } from "../store/CartContext";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
}

function Checkout(){
	const { items, clearCart } = use(CartContext)
	const { progress, hideCheckout } = use(UserProgressContext)

	const {data, error, sendRequest, clearData}  = 
		useHttp('http://localhost:3000/orders', requestConfig);

	const cartTotal = items.reduce((totalPrice, item) => 
		totalPrice + item.price * item.quantity, 0
	)

	function handleCheckoutClose(){
		hideCheckout();
	}

	function handleCheckoutFinish(){
		hideCheckout();
		clearCart();
		clearData();
	}

	async function checkoutAction(prevState, fd){
		const customerData = Object.fromEntries(fd.entries());
		
		await sendRequest(JSON.stringify({
				order: {
					items: items,
					customer: customerData
				}
		}));
	}

	const [formState, formAction, pending] = useActionState(checkoutAction, null )
	
	let actions = <>
		<Button 
			type="button" 
			textOnly
			onClick={handleCheckoutClose}>
			Close
		</Button>
		<Button>Submit Order</Button>
	</>

	if (pending) {
		actions = <span>Sending Order Data...</span>
	}

	if (data && !error){
		return <Modal open={progress === 'checkout'} onClose={handleCheckoutFinish}>
			<h2>Success!</h2>
			<p>Youre order was submitted successfully.</p>
			<p>We will get back to you with more details via email within the next few minutes</p>
			<p className='modal-actions'>
				<Button onClick={handleCheckoutFinish}>Okay</Button>
			</p>
		</Modal>
	}
	
	return (
		<Modal 
			open={progress === 'checkout'}
			onClose={handleCheckoutClose}>
			<form action={formAction}>
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
					{actions}
				</p>
			</form>
		</Modal>
	)
}

export default Checkout;