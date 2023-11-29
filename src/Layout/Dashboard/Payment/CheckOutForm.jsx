import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const CheckOutForm = ({parcelPrice,paymentParcel}) => {
    const [error,setError]=useState(null)
    const [clientSecret,setClientSecret]=useState('')
    const [transactionId,setTransactionId]=useState('')
    const [isPaymentCompleted, setPaymentCompleted] = useState(false);
    const stripe=useStripe();
    const elements=useElements();
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const navigate=useNavigate()
    // console.log("parcelPrice from checkout",parcelPrice)
    // console.log("paymentParcel from checkout",paymentParcel._id)
useEffect(()=>{
 if(parcelPrice > 0 )
 { axiosSecure.post("/create-payment-intent",{price:parcelPrice})
  .then(res=>{
    console.log(res.data.clientSecret)
    setClientSecret(res.data.clientSecret )
  })}

},[axiosSecure,parcelPrice])


    const handleSubmit=async(event)=>{
event.preventDefault();
if (!stripe || !elements) {
    return;
  }
  const card = elements.getElement(CardElement);

  if (card == null) {
    return;
  }
  const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card,
  });

  if (error) {
    console.log('[error]', error);
    setError(error.message)
  } else {
    console.log('[PaymentMethod]', paymentMethod);
    setError('')
  }

//   confirm payment
const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
    payment_method:{
        card:card,
        billing_details:{
          email:user?.email || 'anonymous',
          name:user?.displayName || 'anonymous'
        }
    }
})
if(confirmError){
    console.log("confirmError",confirmError)
}
else{
    console.log("paymentIntent",paymentIntent)
    if(paymentIntent.status==="succeeded"){
        console.log("transaction id=",paymentIntent.id)
        setTransactionId(paymentIntent.id)
        const payment={
            email:user.email,
            price:parcelPrice,
            transactionId:paymentIntent.id,
            date:moment().subtract(10, 'days').calendar(),
            bookingId:paymentParcel._id,
            status:"pending"
        }
        const res=await axiosSecure.post("/payments",payment)
        console.log("payment saved",res)
        if(res.data?.result?.insertedId){
            setPaymentCompleted(true)
            navigate("/paymentSuccess")
        }
    }
}

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <CardElement  
            options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}>
        </CardElement>
<button
 type="submit" 
 disabled={!stripe || !clientSecret || isPaymentCompleted}
 className='btn btn-primary bg-slate-500 mt-5'>
        Pay
      </button>
      <p className='text-red-600'>{error}</p>
      {transactionId && <p className='text-green-600'>Your transaction Id: {transactionId}</p> }
            </form>
        </div>
    );
};

export default CheckOutForm;