export const add_to_cart = "ADD_TO_CART"

export const AddItemToCart = (item) => {
    return {
        type: add_to_cart,
        payload: item
    }
}