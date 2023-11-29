import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useGetAllDeliveryman from '../../../../Hooks/useGetAllDeliveryman';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllOfPercels = () => {
    const axiosSecure=useAxiosSecure();
    const [allDeliveryman]=useGetAllDeliveryman();
    const[selectedBooking,setSelectedBooking]=useState(null)
    const[searchParcel,setSearchParcel]=useState([])
    const navigate=useNavigate()
    
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm()
      const {data:allBookParcel=[],refetch}=useQuery({
        queryKey:["AllBookParcel"],
        queryFn:async()=>{
        const res=await axiosSecure.get("/bookParcel")
        return res.data;
        }    
    })
    useEffect(()=>{
      setSearchParcel(allBookParcel)
    },[allBookParcel])
    const handleManageButton=(parcel)=>{
      setSelectedBooking(parcel)
      document.getElementById('my_modal_5').showModal()
    }
    //   const onSubmit = (data) => {
    //     console.log("hello from data")
    //     console.log("form data",data)
    //     console.log("form  selectedBooking",selectedBooking._id)
    // const updateParcel={
    //     deliverymanId:data.deliverymanId,
    //     approximate_delivery_date:data.approximate_delivery_date,
    //     status:"On the delivery"
    // }
    // console.log("selectedBooking",selectedBooking)
    // console.log("updateParcel",updateParcel)
    // axiosSecure.patch(`/bookParcelFromAdmin/${selectedBooking._id}`,updateParcel)
    // .then(res=>{
    //     console.log(res.data)
    //     if(res.data.modifiedCount >0){
    //         reset();
    //       Swal.fire({
    //           position: "top-end",
    //           icon: "success",
    //           title: `${data.deliverymanId} is selected on ${data.approximate_delivery_date}`,
    //           showConfirmButton: false,
    //           timer: 1500
    //         });
    //     }
    // })
    
    // }
// console.log("selectedBooking",selectedBooking._id)
    
    const handleSearch = (e) => {
      e.preventDefault();
      const form=e.target;
      const fromDate=e.target.from_date.value;
      const toDate=e.target.to_date.value;
      console.log("from and to date",fromDate,toDate)
      if ((fromDate) && (toDate)) {
          const filteredBookings = allBookParcel.filter(
            date => {
              const deliveryDate = (date.delivery_date);
              console.log("requested_delivery_date",date.delivery_date)
              // const startRange =(fromDate);
              // const endRange = (toDate);
        
              return deliveryDate >= fromDate && deliveryDate <= toDate;
            }
          );
          console.log(filteredBookings)
          setSearchParcel(filteredBookings);
          form.reset();
      }
      else{
        setSearchParcel(allBookParcel)
      }
    }
     const handleAssign=(e)=>{
      e.preventDefault();
      const form=e.target;
      const deliverymanId=form.deliverymanId.value;
      const approximate_delivery_date=form.approximate_delivery_date.value;
      console.log(deliverymanId,approximate_delivery_date)
      const updateParcel={
        deliverymanId:deliverymanId,
        approximate_delivery_date:approximate_delivery_date,
        status:"On the delivery"
    }
    console.log("selectedBooking",selectedBooking)
    console.log("updateParcel",updateParcel)
    axiosSecure.patch(`/bookParcelFromAdmin/${selectedBooking._id}`,updateParcel)
    .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            reset();
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${deliverymanId} is selected on ${approximate_delivery_date}`,
              showConfirmButton: false,
              timer: 1500
            });
            // navigate("dashboard/admin/allParcel",replace)
            refetch()
        }
    })


     }
     console.log(allBookParcel)
    return (
        <div>
             <SectionTitle heading={"Parcels"} subheading={"All Information of"}></SectionTitle>
       
             <div >
<form onSubmit={handleSearch}>
<div className="flex space-x-2">
        <div className="form-control my-4">
          <label className="label">
            <span className="label-text">From: </span>
          </label>
          <input
            type="date"
            name='from_date'
            className="input input-bordered"
          />
        </div>
        <div className="form-control my-4">
          <label className="label">
            <span className="label-text">To:</span>
          </label>
          <input
            type="date"
           name='to_date'
            className="input input-bordered"
          />
        </div>
        <button className="btn bg-blue-400 my-4">Search</button>
    
      </div>
</form>
</div>
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
      {searchParcel.map((parcel,index)=>
         <tr key={parcel._id} className="bg-base-200">
         <th>{index+1}</th>
        <td>{parcel.name}</td>
        <td>{parcel.phone}</td>
        <td>{parcel.bookingDate}</td>
        <td>{parcel.delivery_date}</td>
        <td>{parcel.price}</td>
        <td>{parcel.status}</td>

        <td>
        <button className="btn bg-blue-400 btn-sm" 
        disabled={parcel.status !=='pending'}
        onClick={()=>handleManageButton(parcel)}>Manage</button>

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
  <div>
  {/* <form onSubmit={handleSubmit(onSubmit)}>
<div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">DeliveryManId*</span>
                            </label>
        <select 
        // defaultValue="default" 
        value= {watch('deliverymanId') || "default"}
        {...register('deliverymanId', { required: true })}
    className="select select-bordered w-full">
    <option disabled value="default">Select a DeliveryMan</option>
    {allDeliveryman.map(deliveryman=><option 
    key={deliveryman._id} 
    value={deliveryman._id}>{deliveryman._id}</option>)
  }
                            </select>
</div>

 <div className="flex gap-6">
                        
<div className="form-control w-full my-6">
    <label className="label">
        <span className="label-text">Deliveryman Id*</span>
    </label>
    <select {...register('deliverymanId', { required: true })}
        className="select select-bordered w-full">
        <option disabled value="default">Select a deliverymanId</option>
        {
          allDeliveryman.map((deliveryman,index)=> <option key={index} 
            value={deliveryman._id}>{deliveryman._id}</option>)
        }
       
    </select>
</div>
</div> 

 <div className="form-control w-full my-6">
<label className="label">
   <span className="label-text">Approximate Delivery Date*</span>
   </label>
   <input
   type="date"
    placeholder="approximate delivery date"
    {...register('approximate_delivery_date', { required: true })}
    className="input input-bordered w-full" />
</div> 

<button className="btn"> Assign</button>
   </form>  */}

    <form onSubmit={handleAssign}>
    <div className="flex gap-6">
                        
    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">Deliveryman Id*</span>
        </label>
        <select 
        name='deliverymanId' 
        // {...register('deliverymanId', { required: true })}
            className="select select-bordered w-full"
            required>
            <option disabled value="default">Select a deliverymanId</option>
            {
              allDeliveryman.map((deliveryman,index)=> <option key={index} 
                value={deliveryman._id}>{deliveryman._id}</option>)
            }
           
        </select>
    </div>
    </div>
    <div className="flex gap-6">
                        
    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">Approximate Delivery Date*</span>
        </label>
       <input type="date" name="approximate_delivery_date" id="" />
    </div>
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
       </tr>)
       }
     
     
    </tbody>
  </table>
</div>

    </div>

        </div>
    );
};

export default AllOfPercels;