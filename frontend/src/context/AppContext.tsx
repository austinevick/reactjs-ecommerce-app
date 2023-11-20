import React from "react"
import { Cart, CartItem } from "../types/Cart"

type AppState = {
    mode: string
    cart: Cart
}

const initialState: AppState = {
    mode: localStorage.getItem('mode') ? localStorage.getItem('mode')!
        : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark' : 'light',
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems')!) : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress')!) : [],
        paymentMethod: localStorage.getItem('paymentMethod')
            ? localStorage.getItem('paymentMethod')! : 'PayPal',
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0
    }
}

type Action = { type: 'SWITCH_MODE' } | { type: 'CART_ADD_ITEM', payload: CartItem }

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SWITCH_MODE':
            return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }
        case 'CART_ADD_ITEM': {
            const newItem = action.payload
            const existingItem = state.cart.cartItems.find((item) => item._id === newItem._id)
            const cartItems = existingItem ? state.cart.cartItems.map((item) => item._id === existingItem._id ? newItem : item)
                : [...state.cart.cartItems, newItem]
            localStorage.setItem('cartItems', JSON.stringify(cartItems))

            return { ...state, cart: { ...state.cart, cartItems } }
        }
        default:
            return state;
    }
}
const defaultDispatch: React.Dispatch<Action> = () => initialState


const AppContext = React.createContext({
    state: initialState,
    dispatch: defaultDispatch
})

function AppProvider(children: React.PropsWithChildren) {
    const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
        reducer, initialState)

    return <AppContext.Provider value={{ state, dispatch }} {...children} />
}
export { AppContext, AppProvider }