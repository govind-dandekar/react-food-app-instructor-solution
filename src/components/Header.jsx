import { use } from 'react';

import Button from './UI/Button';
import { CartContext } from '../store/CartContext';
import logoImg from '../assets/logo.jpg'

function Header(){

	const { items } = use(CartContext);

	const cartQuantitySum = items.reduce((accumulator, item) => 
			accumulator + item.quantity, 0)
		
	return (
		<header id="main-header">
			<div id="title">
				<img src={logoImg} alt="a restaurant"/>
				<h1>ReactFood</h1>
			</div>
			<nav>
				<Button
					textOnly
				>
					Cart ({cartQuantitySum})
				</Button>
			</nav>
		</header>
	)
}

export default Header;