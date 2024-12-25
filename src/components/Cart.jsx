import { use } from 'react';
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from '../util/formatting';
import Modal from "./UI/Modal";
import CartItem from './CartItem';
import { UserProgressContext } from '../store/UserProgressContext';
import Button from './UI/Button';

function Cart(){
	const { items } = use(CartContext);
	const { progress, hideCart, showCheckout } = use(UserProgressContext);
 
	const cartTotal = items.reduce((totalPrice, item) => 
		totalPrice + item.price * item.quantity, 0
	)
	
	function handleCartClose(){
		hideCart();
	}

	function handleGoToCheckout(){
		showCheckout();
	}

	return (
		<Modal
			className='cart'
			open={progress === 'cart'}
			onClose={progress === 'cart' ? handleCartClose : null}
		>
			<h2>Your Cart</h2>
			<ul>
				{items.map((item) => 
					<CartItem 
						key={item.id}
						item={item}
					/>
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
				{(items.length !== 0) &&
					<Button
						onClick={handleGoToCheckout} 
					>
						Go to Checkout
					</Button>}
			</p>
		</Modal>
	)
}

export default Cart;