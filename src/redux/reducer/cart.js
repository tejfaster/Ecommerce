import { add_to_cart } from "../action/cart";

export const Cart = (state = { list: [] }, action) => {
    switch (action.type) {
        case add_to_cart:
            console.log(action.payload)
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        default:
            return state
    }
}