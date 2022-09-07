import { createStore } from 'redux'
import { combineReducers } from "redux";
import { Cart } from './reducer/cart'

const rootReducer = combineReducers({
    Cart
})
const Store = createStore(rootReducer)
export { Store }