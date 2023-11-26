import React, { useState } from 'react';
import useUser from '../../../../Hooks/useUser';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const MyParcel = () => {
    const[bookParcel,refetch]=useUser();
    const [disabled,setDisabled]=useState(true)
    const {user}=useAuth()
    const navigate=useNavigate()
    // const axiosSecure=useAxiosSecure()
    const axiosPublic=useAxiosPublic()
    const handleStatus=(parcel)=>{
      console.log(parcel)
      Swal.fire({
        title: "Are you sure?",
        text: "You want to make payment!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("make payment and change the pending to payment done")
        }
      });
    }
    const handleDelete=(parcel)=>{
      console.log(parcel)
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
       const res=await axiosPublic.delete(`/bookParcelDelete/${parcel._id}`)
       console.log(res.data)
       if(res.data.deletedCount > 0){
  Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          refetch()
       }
        
        }
      });
    }

    const handleReview=(parcel)=>{
        console.log(parcel)
        if(parcel.status ==='pending'){
            setDisabled(true)
        }
        else{
            setDisabled(false)
        }
    }
    return (
        <div>
           <SectionTitle heading={`${user.displayName}'s Bookings`} subheading={"All Booking Parcels"}></SectionTitle>
        
        <div>
        <div className="overflow-x-hidden">
  <table className="table w-10/12">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Parcel Type</th>
        <th>Requested Delivery Date</th>
        <th>Approximate Delivery Date</th>
        <th>Booking Date</th>
        <th>Delivery Men ID</th>
        <th>Booking Status</th>
        <th>Action</th>
        <th>Action</th>
        <th>Review</th>
        <th>Pay</th>
      </tr>
    </thead>
    <tbody>
      {bookParcel.map((parcel,index)=><tr key={parcel._id} className="bg-base-200">
        <th>{index+1}</th>
        <td>{parcel?.type}</td>
        <td>{parcel?.delivery_date}</td>
        <td></td>
        <td>{parcel?.bookingDate}</td>
        <td></td>
        <td>
            <button onClick={()=>handleStatus(parcel)} className='btn btn-sm bg-slate-300 text-black btn-primary'>{parcel?.status}</button></td>
        <td>
          <Link to={`/dashboard/user/updateParcel/${parcel._id}`}> 
          <button className='btn btn-sm bg-slate-300 text-black btn-primary'>Update</button>
          </Link>
          </td>
        <td>
            <button onClick={()=>handleDelete(parcel)} className='btn btn-sm bg-slate-300 text-black btn-primary'>Delete</button></td>
     <td>
     <button disabled={disabled} onClick={()=>handleReview(parcel)} className='btn btn-sm bg-slate-300 text-black btn-primary'>Review</button>
     </td>
     <td>
     <button className='btn btn-sm bg-slate-300 text-black btn-primary'>Pay</button>
     </td>
     
     
      </tr>)}
      
      
    </tbody>
  </table>
</div>
        </div>
        </div>
    );
};

export default MyParcel;