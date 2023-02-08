import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { reducer } from "./reducer";
// require('dotenv').config();

const AppContext = React.createContext();
const url = 'https://mid-ray-airables-project.netlify.app/api/waystores';
// const exchange_url = `http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_API_KEY}`



const defaultState = {
    all_Products: [],
    filter_products: [],
    loading: false,
    naira_value:0,
    eur_usd: 0,
    eur_naira: 0,
    toggle: false,
       products_error: true,
    single_product_loading: false,
    single_product_error: true,
    filters: {
        brand: 'All',
        type: 'All',
        price: 0,
        min_price: 0,
        max_price: 0,
        color: 'All',
        year: 'All',
        min_mileage: 0,
        max_mileage: 0,
        mileage: 0
    }
}

const ApiProvider = ({children}) =>{
    
     const [state, dispatch] = useReducer(reducer, defaultState)

     
    const getData = async (url) => {
        dispatch({type: "SET_LOADING"});
        try{
            const {data} = await axios.get(url); 
            console.log("data", data);
        dispatch({type: "GET_PRODUCTS_SUCCESS", payload: data})
        dispatch({type: "REMOVE_LOADING"})
        }catch(error){
            dispatch({type:"GET_PRODUCTS_ERROR"})
        }
        
       }

       const getSingleProduct = async (url) => {
        dispatch({type: "SET_SINGLE_LOADING"});
        try{
            const {data} = await axios.get(url); 
            dispatch({type: "GET_SINGLE_PRODUCT_SUCCESS", payload: data})
        }catch(error){
            dispatch({type:"GET_SINGLE_PRODUCT_ERROR"})
        }
        
       }

    //    const fetchExchange = async ()=>{
    //     try{
    //         const response = await axios.get(exchange_url);
    //         const {data: {rates: {USD:usd_price, NGN:naira_price}}} = response;
    //         dispatch({type: "EXCHANGE", payload:{usd_price, naira_price}})
    //     }catch(error){
    //         dispatch({type: "EXCHANGE_ERROR"})
    //     }
    //    }

       

       useEffect(()=>{
        getData(url);
       },[])
       
       useEffect(()=>{
       dispatch({type: "FILTER_PRODUCTS"})
       },[state.filters])

    //    useEffect(()=>{
    //     fetchExchange();
    // },[])

    const findOne = (id) => {
        console.log('id from context', id)
       return dispatch({type: "FINDONE", payload: id})
    }

    const toggleOverlay = (dec) => {
        dispatch({type: "TOGGLE_OVERLAY", payload: dec})
    }

    const updateFilter = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        if(name === 'brand'){
            value = e.target.textContent
        }
        if(name === 'price'){
            value =Number(value)
        }
        if(name === 'mileage'){
            value =Number(value)
        }
        if(name === 'color'){
            value = e.target.dataset.color
        }
        dispatch({type: "UPDATE_FILTER", payload:{name, value}})
    }
    const clearFilter = () =>{
        dispatch({type: "CLEAR_FILTERS"})
    }

   
    return <AppContext.Provider value={{...state,
    findOne, toggleOverlay, clearFilter, updateFilter, getSingleProduct
    }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

export { AppContext, ApiProvider };

