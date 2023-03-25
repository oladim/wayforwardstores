import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { reducer } from "./reducer";
// require('dotenv').config();

const AppContext = React.createContext();
const url = 'https://mid-ray-airables-project.netlify.app/api/waystores';

const exchange_url = `http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_API_KEY}`



const defaultState = {
    all_Products: [],
    filter_products: [],
    loading: false,
    naira_value:0,
    country: null,
    eur_usd: 0,
    nairavalue: 750,
    eur_naira: 0,
    toggle: false,
       products_error: true,
    single_product_loading: false,
    single_product_error: true,
    filters: {
        category: 'All',
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
    
     const [state, dispatch] = useReducer(reducer, defaultState);

     const getGeoInfo = () => {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            if(data){
                dispatch({type: "GET_COUNTRY", payload: data.country_name})
            }
            
        }).catch((error) => {
            console.log(error);
        });
    };
     
    const getData = async (url) => {
        dispatch({type: "SET_LOADING"});
        try{
            const {data} = await axios.get(url); 
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


       var myHeaders = new Headers();
myHeaders.append("apikey", process.env.REACT_APP_FIXER_API_KEY);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

       const fetchExchange = async ()=>{
    
            await fetch("https://api.apilayer.com/fixer/latest?symbols=NGN&base=USD", requestOptions)
            .then(response => response.json())
            .then((result) => {
                const {rates: {NGN: naira_price}} = result;
                if(naira_price){
                    dispatch({type: "EXCHANGE", payload:naira_price});
                }
           
       
            })
            .catch(error => console.log('error', error));
            // const {data: {rates: {USD:usd_price, NGN:naira_price}}} = response;
            // dispatch({type: "EXCHANGE", payload:{usd_price, naira_price}})
       
       }

    useEffect(()=>{
        getGeoInfo();
    },[])
       
    // useEffect(()=>{
    //     fetchExchange();
    // },[])

       useEffect(()=>{
        getData(url);
       },[])
       
    //    useEffect(()=>{
    //    dispatch({type: "FILTER_PRODUCTS"})
    //    },[state.filters])
       
    //    useEffect(()=>{
        
    //     },[state.all_Products])
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
        // console.log(e);
        console.log("name and value", name, value);
        if(name === 'category'){
            value = e.target.textContent;
            console.log("value", value);
        }
        if(name === 'price'){
            value = Number(value)
        }
        if(name === 'mileage'){
            value =Number(value)
        }
        if(name === 'color'){
            value = e.target.dataset.color
        }
        dispatch({type: "UPDATE_FILTER", payload:{name, value}})
        dispatch({type: "FILTER_PRODUCTS"})
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

