import {
  CardElement, Elements,
  useElements, useStripe
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Layout from '../components/Partials/Layout'
import { useCartContext } from './cart_context'
import { useGlobalContext } from './context'
import { useUserContext } from './user_context'
import { formatPrice } from './utils/helpers'

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)


const CheckoutForm = () => {
  const { cart, total_amount, shipping_fee, clearCart, customerDetails } = useCartContext();
 

  const boughtItems = cart.map((item)=>{
    return {
      productID: item.id,
      productTitle: item.title,
      productQuantity: item.amount
    }
  })

  const { myUser } = useUserContext()
  const {country, nairavalue}  = useGlobalContext();
  const navigate = useNavigate();
  // STRIPE STUFF
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('yy')
  const stripe = useStripe()
  const elements = useElements()

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  const createPaymentIntent = async () => {
    try {
     
      const { data } = await axios.post(
        '/.netlify/functions/create-payment-intent',
        JSON.stringify({ boughtItems, shipping_fee, total_amount, customerDetails })
      )
      //  console.log(data.clientSecret);
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    createPaymentIntent()
    // eslint-disable-next-line
  }, [total_amount])



  const handleChange = async (event) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      setTimeout(() => {
        clearCart()
        navigate('/')
      }, 10000)
    }
  }

  return (
    <>
   
    <div>
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page shortly</h4>
        </article>
      ) : (
        <article>
          <h4 className='user'>Hello, {myUser && myUser.name}</h4>
          <p className='total_price'>Your total is: {country === "Nigeria" ? (formatPrice(shipping_fee + (total_amount * nairavalue))) : formatPrice(shipping_fee + total_amount)}</p>
          {/* <p>Test Card Number : 4242 4242 4242 4242</p> */}
        </article>
      )}
      <div className='paydiv'>
      <form id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id='submit'>
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinnier'></div> : 'Pay'}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
        {/* Show  a success message upon completion */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succedded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            Stripe dasboard.
          </a>
          Refresh the page to pay again
        </p>
      </form>
      </div>
    </div>
    
    </>
  )
}

const StripeCheckout = () => {
  return (
    <Layout>
    <Wrapper>
      <Elements stripe={promise}>
        <div className='paydiv'>
        <CheckoutForm />
        </div>
      </Elements>
    </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.section`
margin-top: 2rem;
article{
text-align: center;
  h4{
    font-weight: 600;
    font-size: 1.5rem;
  }
  .total_price{
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
}
.paydiv{
  width: 100vw;
  display: flex;
}
  form {
    width: 30vw;
   
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
    text-align: center;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
  @media (min-width: 360px) {
    article{
      margin-left: 1rem;
      
    }

`

export default StripeCheckout
