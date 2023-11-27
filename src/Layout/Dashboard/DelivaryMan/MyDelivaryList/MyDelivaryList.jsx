import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../Hooks/useAuth';
import usePercelOfDeliveryman from '../../../../Hooks/usePercelOfDeliveryman';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyDelivaryList = () => {
     const {user}=useAuth()
     const axiosSecure=useAxiosSecure()
     const [allPercelOfDeliveryman,refetch]=usePercelOfDeliveryman()

   const handleCancel=(parcel)=>{
    console.log(parcel)
    const updatedStatus={
        status:"canceled"
    }
    axiosSecure.patch(`/bookParcelFromDeliveryman/${parcel._id}`,updatedStatus)
    .then(res=>{
     console.log(res.data)
     if(res.data.modifiedCount >0){
      refetch()
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${parcel?.type} is  ${parcel?.status} now`,
          showConfirmButton: false,
          timer: 1500
        });
  }
})
   }

   const handleDeliver=(parcel)=>{
    console.log(parcel)
    const updatedStatus={
        status:"delivered"
    }
    axiosSecure.patch(`/bookParcelFromDeliveryman/${parcel._id}`,updatedStatus)
    .then(res=>{
     console.log(res.data)
     if(res.data.modifiedCount >0){
      refetch()
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${parcel?.type} is  ${parcel?.status} now`,
          showConfirmButton: false,
          timer: 1500
        });
  }
})
   }

    return (
        <div>
            <SectionTitle heading={"My Delivery List"} subheading={"all information of"}></SectionTitle>
        <div>
           
        <div>
        <div className="overflow-x-auto">
  <table className="table table-xs table-pin-rows table-pin-cols">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Booked User’s Name</th>
        <th>Receivers Name</th>
        <th>Booked User’s Phone</th>
        <th>Requested Delivery Date</th>
        <th>Approximate Delivery Date</th>
        <th>Reciever's phone number</th>
        <th>Location</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {allPercelOfDeliveryman.map((parcel,index)=> <tr key={parcel._id} className="bg-base-200">
        <th>{index+1}</th>
        <td>{parcel.name}</td>
        <td>{parcel.receiver_name}</td>
        <td>{parcel.phone}</td>
        <td>{parcel.delivery_date}</td>
        <td>{parcel.approximate_delivery_date}</td>
        <td>{parcel.receiver_phone}</td>
        <td>{parcel.requested_delivery_address}</td>
        <td>
        {parcel.status === 'canceled' ?'Canceled': <button
          onClick={()=>handleCancel(parcel)}
          className="btn bg-blue-400 btn-sm"
          disabled={parcel.status === "delivered"}>
              Cancel</button>}
        </td>
        <td>
        {parcel.status === 'delivered' ?'Delivered': <button
          onClick={()=>handleDeliver(parcel)}
          className="btn bg-blue-400 btn-sm"
          disabled={parcel.status === "canceled"}>
              Deliver</button>}
        </td>
        
      </tr>)}
     
     
    </tbody>
  </table>
</div>
        </div>
        </div>
        </div>
    );
};

export default MyDelivaryList;