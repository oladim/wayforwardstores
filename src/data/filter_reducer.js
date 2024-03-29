import {
  CLEAR_FILTERS, FILTER_PRODUCTS, LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW, SORT_PRODUCTS,
  UPDATE_FILTERS, UPDATE_SORT
} from './actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.offer_price)
    maxPrice = Math.max(...maxPrice)
    let minPrice = action.payload.map((p) => p.offer_price)
    minPrice = Math.min(...minPrice)

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice, min_price: minPrice },
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProducts = [...filtered_products]
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1
        }
        if (a.price > b.price) {
          return 1
        }
        return 0
      })
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filtered_products: tempProducts }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { category } = state.filters

    let tempProducts = [...all_products]
    // filtering
    // text
    // if (text) {
    //   tempProducts = tempProducts.filter((product) => {
    //     return product.name.toLowerCase().startsWith(text)
    //   })
    // }
    // category
    if (category !== 'All') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }

    // company
    // if (company !== 'All') {
    //   tempProducts = tempProducts.filter(
    //     (product) => product.company === company
    //   )
    // }
    // colors
    // if (category !== 'All Products') {
    //   tempProducts = tempProducts.filter((product) => {
    //     return product.category.find((c) => c === category)
    //   })
    // }
    // // price
    // tempProducts = tempProducts.filter((product) => product.price <= price)
    // shipping
    // if (shipping) {
    //   tempProducts = tempProducts.filter((product) => product.shipping === true)
    // }

    return { ...state, filtered_products: tempProducts }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        category: '',
        // company: 'all',
        // category: 'all',
        // color: 'all',
        // price: state.filters.max_price,
        // shipping: false,
      },
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
