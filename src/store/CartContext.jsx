import { createContext, useReducer } from "react";

export const CartContext = createContext({
	items: [],
	addItem: (item) => {},
	removeItem: (id) => {},
	clearCart: () => {}
});

// return updated state based on action param
function cartReducer(state, action){
	if (action.type === 'ADD_ITEM'){
		//.. update state to add a meal item to items
		// make shallow copy so no edits to underlying array
		// occur before code completes execution
		// also want idempotent button press
		const existingCartItemIndex = state.items.findIndex((item) => 
			item.id === action.item.id
		)

		// new array in memory
		const updatedItems = [...state.items]

		if (existingCartItemIndex > -1){
			const existingItem = state.items[existingCartItemIndex]
			const updatedItem = {
				...existingItem,
				quantity: existingItem.quantity + 1
			}

			// update index of existing item with incremented quantity
			updatedItems[existingCartItemIndex] = updatedItem;
	
			return {
				...state, 
				items: updatedItems
			}

		} else {
			// add new item to new array
			updatedItems.push({
				// spread mealItem data onto object
				...action.item,
				// set init quantity
				quantity: 1
			})

			// return updated state
			return {
				...state,
				items: updatedItems
			}
		}
	}

	if (action.type === 'REMOVE_ITEM' ){
		//... remove item from state
		// if quantity > 1 reduce quantity; else remove entirely
		const existingCartItemIndex = state.items.findIndex((item) => 
			item.id === action.id
		)

		const existingCartItem = state.items[existingCartItemIndex];

		// create new array
		const updatedItems = [...state.items]

		if(existingCartItem.quantity === 1){
			
			// will removed 1 item at that index
			updatedItems.splice(existingCartItemIndex, 1);
		} else {
			const updatedItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity - 1
			}
			updatedItems[existingCartItemIndex] = updatedItem
		}

		return {...state, items: updatedItems};
	}

	if (action.type === 'CLEAR_CART'){
		return { ...state, items:[] }
	}

	// return unchanged state if not action met
	return state;
}

export function CartContextProvider({children}){
	// first param = pointer to reducer fx
	// second param = init state value
	const [cart, dispatchCartAction] = useReducer(cartReducer, {
		items: []
	})

	function addItem(item){
		dispatchCartAction({
			type: 'ADD_ITEM',
			item: item
		})
	};

	function removeItem(id){
		dispatchCartAction({
			type: 'REMOVE_ITEM',
			id: id
		})
	};

	function clearCart(){
		dispatchCartAction({
			type: 'CLEAR_CART'
		})
	}

	const cartContext = {
		items: cart.items,
		addItem: addItem,
		removeItem: removeItem,
		clearCart: clearCart
	}

	return (
		<CartContext value={cartContext}>
			{children}
		</CartContext>
	)
}
