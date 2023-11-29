import React, { useEffect, useState } from 'react';
import useUser from '../../../../Hooks/useUser';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import moment from 'moment'
const MyParcel = () => {
    const[bookParcel,refetch]=useUser();
    const [selectedParcel,setSelectedParcel]=useState([])
    const {user}=useAuth()
    const navigate=useNavigate()
    const [bookingParcel,setBookingParcel]=useState([])
    const axiosSecure=useAxiosSecure()
    const axiosPublic=useAxiosPublic()
    
    useEffect(()=>{
      setBookingParcel(bookParcel)
      // setSelectedParcel(bookParcel)
    },[bookParcel])
    
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
// console.log("hello",bookingParcel)

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
    }
  });
}

const handleReview=(parcel)=>{
  setSelectedParcel(parcel)
  document.getElementById('my_modal_5').showModal()
}

// console.log("selectedParcel",selectedParcel)



const handleAssign=(e)=>{
  e.preventDefault();
  const form=e.target;
  const feedback_Text=form.feedback_Text.value;
  const review=form.review.value;

  // console.log("feedback_Text",feedback_Text)
  // console.log("review",review)
  const updateParcel={
    feedback_Text:feedback_Text,
    review:parseInt(review),
    Review_Giving_Date:moment().subtract(10, 'days').calendar()
}
// console.log("selectedParcel",selectedParcel)
// console.log("updateParcel",updateParcel)
axiosSecure.patch(`/updateBookParcelFromUser/${selectedParcel._id}`,updateParcel)
.then(res=>{
    console.log("updated in bookparcel",res.data)
    console.log("selectedParcel._id",selectedParcel._id)
    console.log("selectedParcel.deliverymanId",selectedParcel.deliverymanId)
    if(res.data.modifiedCount > 0){
      const updateReview={
        reviewedParcel:parseInt(review)
      }
      console.log("updateReview",updateReview)
      axiosSecure.patch(`/reviewedParcelCount/${selectedParcel.deliverymanId}`,updateReview)
      .then(reviewRes=>{
        console.log("updated in deliveryman id",reviewRes.data)
        if(reviewRes.data.modifiedCount > 0){
          
          refetch()
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Review is Done`,
              showConfirmButton: false,
              timer: 1500
            });
            // navigate("dashboard/admin/allParcel",replace)
            refetch()
        }
      })
        // reset();
      
    }
})


 }

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
          <button
          disabled={parcel.status !== 'pending'}
          className='btn btn-sm bg-slate-300 text-black btn-primary'>Update</button>
          </Link>
          </td>
        <td>
            <button
            disabled={parcel.status !== 'pending'}
            onClick={()=>handleDelete(parcel)} className='btn btn-sm bg-slate-300 text-black btn-primary'>Delete</button></td>
     <td>
     <button disabled={parcel.status !== 'delivered'} onClick={()=>handleReview(parcel)} className='btn btn-sm bg-slate-300 text-black btn-primary'>Review</button>
    
     <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
  <div>
    <form onSubmit={handleAssign}>
    
    <div className="flex gap-6">
                        
    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">Feedback Text.*</span>
        </label>
        <textarea 
        className="textarea" 
        placeholder='Feedback Text.' 
        name="feedback_Text" 
        required >
 </textarea>
    </div>
    </div>
    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">Review*</span>
        </label>
        <select 
        name='review' 
        type="number"
            className="select select-bordered w-full"
            required>
            <option disabled value="default">Give a Review</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
           
        </select>
    </div>
    <button className='btn'>Assign</button>
    </form>
  </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    
     </td>
     <td>
    <Link to={`/dashboard/payment/${parcel._id}`}>
    
    <button disabled={parcel.status !== 'delivered'} 
     className='btn btn-sm bg-slate-300 text-black btn-primary'>
      Pay</button>
    </Link>
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