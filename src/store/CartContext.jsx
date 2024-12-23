import { createContext, useReducer } from "react";

const CartContext = createContext({
	items: [],
	addItem: (item) => {},
	removeItem: (id) => {}
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
	}

	// return unchanged state if not action met
	return state;
}

export function CartContextProvider({children}){
	
	// first param = pointer to reducer fx
	// second param = init state value
	useReducer(cartReducer, {
		items: []
	})

	return (
		<CartContext>
			{children}
		</CartContext>
	)
}

export default CartContext;