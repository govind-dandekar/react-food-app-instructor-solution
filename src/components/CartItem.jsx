import { use } from "react";

import { currencyFormatter } from "../util/formatting";

import { CartContext } from "../store/CartContext";

function CartItem({item}){
	
	const { addItem, removeItem} = use(CartContext)
	const { name, quantity, price, id } = item;

	function handlePlus(){
		addItem(item)
	}

	function handleMinus(){
		removeItem(id)
	}

	return (
		<li className="cart-item">
			<p>
				{name} - {quantity} x {currencyFormatter.format(price)}
			</p>
			<p className="cart-item-actions">
				<button onClick={handlePlus}>+</button>
				<span>{quantity}</span>
				<button onClick={handleMinus}>-</button>
			</p>
		</li>
	)
}

export default CartItem;