import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';



const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_Key)
const Payment = () => {
    const paymentParcel=useLoaderData();
    console.log("paymentParcel",paymentParcel.price)
    const [parcelPrice,setParcelPrice]=useState(paymentParcel.price)
    return (
        <div className='mx-w-6xl mx-auto'>
        <SectionTitle heading={"Payment"}subheading={"Please Pay"}>

        </SectionTitle>
        <div>
            <Elements stripe={stripePromise}>
            <CheckOutForm parcelPrice={parcelPrice} paymentParcel={paymentParcel}></CheckOutForm>
            </Elements>
            </div>
        </div>
    );
};

export default Payment;