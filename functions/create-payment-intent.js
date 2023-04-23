// domain/.netlify/functions/create-payment-intent
require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  if (event.body) {
    const { boughtItems, shipping_fee, total_amount, customerDetails } = JSON.parse(event.body)
    

    const calculateOrderAmount = () => {
      return (shipping_fee + total_amount) * 100
    }
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
        description: customerDetails? `Items purcahsed by: ${customerDetails.firstName} ${customerDetails.lastName}: ${customerDetails.phone}` : "" ,
      receipt_email: customerDetails? customerDetails.email: "",
      metadata: {
        destination: customerDetails? customerDetails.address : "",
        invoice: JSON.stringify([...boughtItems])
      }
      })
      
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      }
    }
  }
  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  }
}
