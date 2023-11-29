import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useEffect } from 'react';
import { useState } from 'react';

const PaymentHistory = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const[history,setHistory]=useState([])
    useEffect(()=>{
        axiosSecure.get(`/paymentHistory?email=${user.email}`)
        .then(res=>{
            console.log(res.data)
            setHistory(res.data)
        })
    },[axiosSecure,user.email])
    // console.log(history)
    return (
        <div>
            <SectionTitle heading={"payments"} subheading={"history of"}></SectionTitle>
        <div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Email</th>
        <th>Price</th>
        <th>Date</th>
        <th>TransactionId</th>
      </tr>
    </thead>
    <tbody>
      {history.map((history,index)=><tr key={history._id}>
        <th>{index+1}</th>
        <td>{history.email}</td>
        <td>${history.price}</td>
        <td>{history.date}</td>
        <td>{history.transactionId}</td>
        
      </tr>)}
     
      
    </tbody>
  </table>
</div>

        </div>
        
        </div>
    );
};

export default PaymentHistory;