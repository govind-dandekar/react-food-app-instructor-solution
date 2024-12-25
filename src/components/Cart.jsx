import { use } from 'react';
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from '../util/formatting';
import Modal from "./UI/Modal";
import { UserProgressContext } from '../store/UserProgressContext';
import Button from './UI/Button';

function Cart(){
	const { items } = use(CartContext);
	const { progress, hideCart } = use(UserProgressContext);
 
	const cartTotal = items.reduce((totalPrice, item) => 
		totalPrice + item.price * item.quantity, 0
	)
	
	function handleCartClose(){
		hideCart();
	}

	return (
		<Modal
			className='cart'
			open={progress === 'cart'}
		>
			<h2>Your Cart</h2>
			<ul>
				{items.map((item) => 
					<li key={item.id}>
						{item.name} - {item.quantity}
					</li>
				)}
			</ul>
			<p className="cart-total">
				{currencyFormatter.format(cartTotal)}
			</p>
			<p className="modal-actions">
				<Button 
					textOnly
					onClick={handleCartClose}	
				>
						Close
				</Button>
				<Button
					onClick={handleCartClose}
				>
					Go to Checkout
				</Button>
			</p>
		</Modal>
	)
}

export default Cart;