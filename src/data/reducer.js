
export const reducer = (state, action) =>{
    if(action.type === "SET_LOADING"){
        return {...state, loading: true}
    }
    if(action.type === "GET_PRODUCTS_SUCCESS"){
        
        // let maxPrice = action.payload.map((p)=> p.price);
        // let maxMileage = action.payload.map((p)=> p.mileage);
        // maxMileage = Math.max(...maxMileage)
        // maxPrice = Math.max(...maxPrice)
        return {...state, all_Products:[...action.payload], filter_products: [...action.payload], filters:{...state.filters}}
        //     , max_price:maxPrice, price:maxPrice,
        // max_mileage:maxMileage, mileage:maxMileage
        
    }
    if(action.type === "REMOVE_LOADING"){
        return {...state, loading: false}
    }
    if(action.type === "GET_COUNTRY"){
        return {...state, country: action.payload}
    }
    if(action.type === "TOGGLE_OVERLAY"){
        if(action.payload === 'open'){
             return {...state, toggle: true}
        }
        if(action.payload === 'close'){
             return {...state, toggle: false}
        }
      
    }
    if(action.type === "SET_SINGLE_LOADING"){
        return {...state, single_product_loading: true, single_product_error: false}
      }
      if(action.type === "GET_SINGLE_PRODUCT_SUCCESS"){
        return {...state, single_product_loading: false, single_product: action.payload}
      }
      if(action.type === "GET_SINGLE_PRODUCT_ERROR"){
        return {...state, single_product_loading: false, single_product_error: true}
      }
      if(action.type === "GET_PRODUCTS_ERROR"){
        return {...state, loading: false, products_error: true}
      }
    if(action.type === "UPDATE_FILTER"){
        const {name, value} = action.payload;
        return {...state, filters:{...state.filters, [name]:value}}
    }
    if(action.type === "EXCHANGE"){
        
      
            return {...state, nairavalue: action.payload}
     
    }
    if(action.type === "FILTER_PRODUCTS"){
        const {all_Products} = state;
        const {brand,
        type,
        price,
        color,
        year,
        mileage} = state.filters
        let filteringProducts = [...all_Products];
            // if(brand !== 'All'){
            //     filteringProducts = filteringProducts.filter((product)=>{
            //         return product.brand === brand;
            //     })
            // }
            // if(type !== 'All'){
            //     filteringProducts = filteringProducts.filter((product)=>{
            //         return product.type === type;
            //     })
            // }
            // if(color !== 'All'){
            //     filteringProducts = filteringProducts.filter((product)=>{
            //         return product.color.find((c)=> c === color)
            //     })
            // }
            // if(year !== 'All'){
            //     filteringProducts = filteringProducts.filter((product)=>{
            //         return product.year === year;
            //     })
            // }

            // filteringProducts = filteringProducts.filter((product)=>{
            //     return product.price <= price
            // })

            // filteringProducts = filteringProducts.filter((product)=>{
            //     return product.mileage <= mileage
            // })

        return {...state, filter_products: filteringProducts}
    }
    if(action.type === "CLEAR_FILTERS"){
        return {...state, filters:{...state.filters, 
            brand: 'All',
            type: 'All',
            price: state.filters.max_price,
            color: 'All',
            year: 'All',
            mileage: state.filters.max_mileage
        }}
    }
    throw new Error(`No Matching "${action.type}" - action type`)
    // if(action.type ==="FINDONE"){
    //     console.log("from reducer", action.payload)
    //     const request= state.allProducts.find(newCar => newCar.id === parseInt(action.payload))
    //    console.log(request)
    //     return {...state, allProducts: request}
    // }
    // throw new Error("No Matching Dispatch")
}
