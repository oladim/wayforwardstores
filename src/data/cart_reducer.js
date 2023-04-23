import {
  ADD_TO_CART, ADD_TO_WISH, CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT, TOGGLE_WISH_ITEM_AMOUNT
} from './actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, products } = action.payload
    const tempItem = state.cart.find((i) => i.id === id)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })

      return { ...state, cart: tempCart }
    } else {
     
      const newItem = {
        id: id,
        title: products.title,
        amount,
        url: products.url,
        price: products.price,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  if(action.type === "ADD_CUSTOMER_DATA"){
    const {firstName, lastName, email, phone, address} = action.payload
    const newItem = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address
    }
    return { ...state, customerDetails:  newItem }
  }

  if(action.type === "CUSTOMER"){
    return { ...state }
  }

  if (action.type === ADD_TO_WISH) {
    console.log("action payload from wish", action.payload)
    const { id, amount, products } = action.payload
    const tempItem = state.wish.find((i) => i.id === id)
    if (tempItem) {
      const tempCart = state.wish.map((cartItem) => {
        if (cartItem.id === id) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })

      return { ...state, wish: tempCart }
    } else {
     
      const newItem = {
        id: id,
        name: products.title,
        amount,
        image: products.url,
        price: products.price,
      }
      return { ...state, wish: [...state.wish, newItem] }
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }

  if (action.type === TOGGLE_WISH_ITEM_AMOUNT) {
    console.log("toggled");
    const { id, value } = action.payload
    const tempCart = state.wish.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      }
      return item
    })
    return { ...state, wish: tempCart }
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem
        total.total_items += amount
        total.total_amount += price * amount
        return total
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    )
    return { ...state, total_items, total_amount }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
