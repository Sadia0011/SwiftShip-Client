import React, { useState } from 'react';
import useUser from '../../../../Hooks/useUser';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateParcel = () => {
    const parcel=useLoaderData()
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
console.log(parcel)
const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
const[weight,setWeight]=useState('')
const [price, setPrice] = useState(50); 

const handleWeightChange = (e) => {
    console.log("Hello from handle weight chnge")
    const newWeight = e.target.value;
    setWeight(newWeight);
  
    let newPrice;
    if (newWeight <= 1) {
      newPrice = 50;
    } else if (newWeight <= 2) {
      newPrice = 100;
    } else {
      newPrice = 150;
    }
  
    setPrice(newPrice);
  };

const onSubmit = (data) => {
        
    console.log(data)
    const newParcel = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      weight: data.weight,
      receiver_name: data.receiver_name,
      receiver_phone: data.receiver_phone,
      requested_delivery_address: data.requested_delivery_address,
      latitude: data.latitude,
      longtitude: data.longtitude,
      delivery_date: data.delivery_date,
      price: parseFloat(data.price),
      status:"pending"
  }
  // 
  Swal.fire({
    title: "Are you sure?",
    text: "You want to update this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update the booking!"
  }).then(async(result) => {
    if (result.isConfirmed) {
       const parcelRes = await axiosSecure.patch(`/bookParcelForOneItem/${parcel._id}`, newParcel);
  console.log(parcelRes.data)
  if(parcelRes.data.modifiedCount >0){
      // show success popup
      reset();
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: `parcel is updated on ${data.delivery_date}.`,
          showConfirmButton: false,
          timer: 1500
        });
  }
}
  });
 

}

    return (
        <div>
            <SectionTitle heading={"Update Parcel"} subheading={"Your parcel,our priority"}></SectionTitle>
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
   <div className='md:flex gap-1'>
     {/* name */}
     <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Name*</span>
    </label>
  <input 
  type="text" 
  defaultValue={user.displayName}
  {...register("name",{required:true})}
  placeholder="Type Name here" 
  className="input input-bordered 
  w-full "
  readOnly />
</div>
    {/* email */}
      <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Email*</span>
    </label>
  <input 
  type="text" 
  defaultValue={user.email}
  {...register("email",{required:true})}
  placeholder="Type Email here" 
  className="input input-bordered 
  w-full "
  readOnly />
</div>
 {/* phone NUmber */}
 <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Phone Number*</span>
    </label>
  <input 
  type="tel" 
  defaultValue={parcel.phone}
  {...register("phone",{required:true})}
  placeholder="Type Phone Number here" 
  className="input input-bordered 
  w-full "
   />
</div>
   </div>
   
    <div className='md:flex gap-1'>
        {/* Parcel Type */}
      <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Parcel Type*</span>
    </label>
  <input 
  type="text" 
  defaultValue={parcel.type}
  {...register("type",{required:true})}
  placeholder="Type Parcel Type here" 
  className="input input-bordered 
  w-full "
   />
</div>
    {/* Parcel Weight */}
      <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Parcel Weight*</span>
    </label>
  <input 
  type="number" 
  defaultValue={parcel.weight}
  onClick={handleWeightChange}
  {...register("weight",{required:true})}
  placeholder="Type Parcel Weight here" 
  className="input input-bordered w-full "
   />
</div>
    </div>
   <div className='md:flex gap-1'>
     {/* Receiver's Name */}
     <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Receiver's Name*</span>
    </label>
  <input 
  type="text" 
  defaultValue={parcel.receiver_name}
  {...register("receiver_name",{required:true})}
  placeholder="Type Receiver's Name here" 
  className="input input-bordered 
  w-full "
   />
</div>
    {/*Receiver's Phone */}
      <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Receiver's Phone*</span>
    </label>
  <input 
  type="tel" 
  defaultValue={parcel.receiver_phone}
  {...register("receiver_phone",{required:true})}
  placeholder="Type Receiver's Phone here" 
  className="input input-bordered 
  w-full "
   />
</div>
   </div>
    {/*Delivery Address */}
      <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text">Requested Delivery Address*</span>
    </label>
  <input 
  type="text" 
  defaultValue={parcel.requested_delivery_address}
  {...register("requested_delivery_address",{required:true})}
  placeholder="Type Requested delivery Address here" 
  className="input input-bordered 
  w-full "
   />
</div>
   

   <div className='md:flex gap-1'>
    {/*Delivery Address Latitude*/}
   <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Delivery Address Latitude*</span>
    </label>
  <input 
  type="text" 
  defaultValue={parcel.latitude}
  {...register("latitude",{required:true})}
  placeholder="Type Delivery Address Latitude here" 
  className="input input-bordered 
  w-full "
   />
</div>
   {/*Delivery Address Longtitude*/}
   <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Delivery Address Longtitude*</span>
    </label>
  <input 
  type="text" 
  defaultValue={parcel.longtitude}
  {...register("longtitude",{required:true})}
  placeholder="Type Delivery Address Longtitude here" 
  className="input input-bordered 
  w-full "
   />
</div>
   </div>


   <div className='md:flex gap-1'>
      {/*Delivery Date */}
      <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text">Requested Delivery Date*</span>
    </label>
  <input 
  type="date" 
  defaultValue={parcel.delivery_date}
  {...register("delivery_date",{required:true})}
  placeholder="Type Delivery Date here" 
  className="input input-bordered 
  w-full "
   />
</div> 
   {/*Price*/}
   <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text"> Price*</span>
    </label>
  <input 
  type="text"
  value={price}
  {...register("price",{required:true})}
  placeholder="Type Price here" 
  className="input input-bordered 
  w-full "
  readOnly
   />
</div>
   </div>
     


      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}

     
      <button className='btn w-full bg-slate-400 hover:bg-slate-900 hover:text-white'>Update Parcel <FaEdit></FaEdit> </button>
  
    </form>
        </div>
        </div>
    );
};

export default UpdateParcel;