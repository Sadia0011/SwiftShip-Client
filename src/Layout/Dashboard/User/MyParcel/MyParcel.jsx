import React, { useEffect, useState } from 'react';
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
    const [disabledPay,setDisabledPay]=useState(true)
    const {user}=useAuth()
    const navigate=useNavigate()
    const [bookingParcel,setBookingParcel]=useState([])
    // const axiosSecure=useAxiosSecure()
    const axiosPublic=useAxiosPublic()
    useEffect(()=>{
      setBookingParcel(bookParcel)
    },[bookParcel])
    
  console.log(bookingParcel)
    const handleDelete=(parcel)=>{
      console.log(parcel.status)
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
       else{
        Swal.fire({
          title: "you can't delete this file!",
          text: "Delete if the status is pending",
          icon: "success"
        });
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
    const handlePay=(parcel)=>{
        console.log(parcel)
        if(parcel.status ==='pending'){
            setDisabledPay(true)
        }
        else{
            setDisabledPay(false)
        }
    }


    const handleSearch=e=>{
      e.preventDefault();
      const form=e.target;
      const search_status=e.target.search_status.value.toLowerCase();
      // console.log(search_status)
      if (search_status.trim() !== "") {
          const filteredBookings = bookParcel.filter(
            food => food.status.toLowerCase().includes(search_status)
          );
          setBookingParcel(filteredBookings);
          form.reset();
  }
  else{
      setBookingParcel(bookParcel)
  }
  }
console.log("hello",bookingParcel)
    return (
        <div>
           <SectionTitle heading={`${user.displayName}'s Bookings`} subheading={"All Booking Parcels"}></SectionTitle>
        
           <div>
        <form onSubmit={handleSearch}>
        <div className="join">
  <input name='search_status' className="input input-bordered join-item" placeholder="Search by status"/>
  <button className="btn join-item rounded-r-full">Search</button>
</div>
        </form>
       </div>


        <div>
        <div className="overflow-x-">
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
      {bookingParcel.map((parcel,index)=><tr key={parcel._id} className="bg-base-200">
        <th>{index+1}</th>
        <td>{parcel?.type}</td>
        <td>{parcel?.delivery_date}</td>
        <td>{parcel?.approximate_delivery_date ? parcel.approximate_delivery_date : "Not Assigned"}</td>
        <td>{parcel?.bookingDate}</td>
        <td>{parcel?.deliverymanId ? parcel.deliverymanId : "Not Assigned"}</td>
        <td>{parcel?.status}</td>
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
     <button disabled={disabledPay} onClick={()=>handlePay(parcel)}  className='btn btn-sm bg-slate-300 text-black btn-primary'>Pay</button>
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