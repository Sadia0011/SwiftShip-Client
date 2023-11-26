import React, { useState } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useGetAllDeliveryman from '../../../../Hooks/useGetAllDeliveryman';

const AllParcel = () => {
    const axiosSecure=useAxiosSecure()
    const [allDeliveryman]=useGetAllDeliveryman()
    const[selectedBooking,setSelectedBooking]=useState(null)
    const {data:allBookParcel=[],refetch}=useQuery({
        queryKey:["AllBookParcel"],
        queryFn:async()=>{
        const res=await axiosSecure.get("/bookParcel")
        return res.data;
        }    
    })
    // console.log(allBookParcel)
  const handleManageButton=(parcel)=>{
    setSelectedBooking(parcel)
    document.getElementById('my_modal_5').showModal()
  }
  const [modalStartDate, setModalStartDate] =useState(null);
  const [modalEndDate, setModalEndDate] =useState(null);

  const handleModalSearch = () => {
    // Filter parcels based on the selected date range in the modal
    const filteredParcels = allBookParcel.filter((parcel) => {
      const deliveryDate = new Date(parcel.delivery_date);
      console.log(deliveryDate)
      return (
        (!modalStartDate || deliveryDate >= new Date(modalStartDate)) &&
        (!modalEndDate || deliveryDate <= new Date(modalEndDate))
      );
    });
  }
  const handleAssign=(e)=>{
    e.preventDefault()
console.log("changes done")
  }
    return (
        <div>
            <SectionTitle heading={"Parcels"} subheading={"All Information of"}></SectionTitle>
        <div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Sender's Name</th>
        <th>Sender's Phone</th>
        <th>Booking Date</th>
        <th>Requested Delivery Date</th>
        <th>Cost</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {allBookParcel.map((parcel,index)=> <tr
      key={parcel._id}
      className="bg-base-200">
        <th>{index+1}</th>
        <td>{parcel.name}</td>
        <td>{parcel.phone}</td>
        <td></td>
        <td>{parcel.delivery_date}</td>
        <td>{parcel.price}</td>
        <td>{parcel.status}</td>
        <td>
     {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn bg-blue-400 btn-sm" 
onClick={()=>handleManageButton(parcel)}>Manage</button>
<form onSubmit={handleAssign}>

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box flex flex-col">
    <h3 className="font-bold text-lg mb-3">Manage Bookings</h3>
 
 <label className='level'>
 <span className="label-text">Deliveryman Id</span>
 </label>
   <select className="select select-bordered w-full max-w-xs">
  <option disabled selected>Who shot first?</option>
  {allDeliveryman.map(deliveryman=><option key={deliveryman._id} value={deliveryman._id}>{deliveryman._id}</option>)
  }
</select>
<div className="form-control my-4">
              <label className="label">
                <span className="label-text">Start Date</span>
              </label>
              <input
                type="date"
                value={modalStartDate}
                onChange={(e) => setModalStartDate(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <div className="form-control my-4">
              <label className="label">
                <span className="label-text">End Date</span>
              </label>
              <input
                type="date"
                value={modalEndDate}
                onChange={(e) => setModalEndDate(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <button
              className="btn bg-blue-400 my-4"
              onClick={handleModalSearch}
            >
              Search
            </button>
{/* <div className='m-3'>
    <span>From:  </span>
<input type="date" />
</div>
<div >
    <span>To: </span>
<input type="date" />
</div> */}

   
     <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button
        className="btn">Assign</button>
      </form>
    </div>
  </div>
</dialog>
</form>

        </td>
       
      </tr>)
      }
     
      
    </tbody>
  </table>
</div>
        </div>
        
        </div>
    );
};

export default AllParcel;