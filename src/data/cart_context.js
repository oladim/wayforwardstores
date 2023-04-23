import React, { useContext, useEffect, useReducer } from 'react'
import {
  ADD_TO_CART, ADD_TO_WISH, CLEAR_CART,
  COUNT_CART_TOTALS, REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT, TOGGLE_WISH_ITEM_AMOUNT
} from './actions'
import reducer from './cart_reducer'

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}

const getCustomerData = () => {
  let customer = localStorage.getItem('customer')
  if (customer) {
    return JSON.parse(localStorage.getItem('customer'))
  } else {
    return {}
  }
}

const getWishList = () => {
  let wish = localStorage.getItem('wish')
  if (wish) {
    return JSON.parse(localStorage.getItem('wish'))
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 0,
  wish: getWishList(),
  customerDetails: getCustomerData()
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // add to cart
  const addToCart = (id, amount, products) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, products } })
  }

  // add customer data
  const addCustomerData = (customerData) => {
    dispatch({type: "ADD_CUSTOMER_DATA", payload: customerData})
  }

  // add to WishList
  const addToWishList = (id, amount, products) => {
    dispatch({ type: ADD_TO_WISH, payload: { id, amount, products } })
  }
  // remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }
  // toggle amount
  const toggleAmount = (id, value) => {
      console.log(id, value)
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
   
  }
  const toggleAmountWish = (id, value, wishItem) =>{
    console.log(id, value, wishItem)
    dispatch({ type: TOGGLE_WISH_ITEM_AMOUNT, payload: { id, value } })
  }
  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem('wish', JSON.stringify(state.wish))
  }, [state.wish])

  useEffect(() => {
    dispatch({ type: "CUSTOMER" })
    localStorage.setItem('customer', JSON.stringify(state.customerDetails))
  }, [state.customerDetails])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart, addToWishList, toggleAmountWish, addCustomerData }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
