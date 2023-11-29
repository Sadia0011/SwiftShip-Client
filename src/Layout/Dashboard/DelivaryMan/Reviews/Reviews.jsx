import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import usePercelOfDeliveryman from '../../../../Hooks/usePercelOfDeliveryman';
import useAuth from '../../../../Hooks/useAuth';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
    const [allPercelOfDeliveryman]=usePercelOfDeliveryman();
    const[reviewParcel,setReviewParcel]=useState([])
    const{user}=useAuth();
    const image=user.photoURL;
    useEffect(()=>{
        const reviews=allPercelOfDeliveryman.filter(review=>review.feedback_Text)
        setReviewParcel(reviews)
    },[allPercelOfDeliveryman])
    return (
        <div>
            
            <SectionTitle heading={"Reviews"} subheading={"All information of my"}></SectionTitle>
        
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
        {
            reviewParcel.map(parcel=><div key={parcel._id}>
<div className="relative h-[500px] flex w-full max-w-[26rem] flex-col rounded-xl bg-slate-100 lg:p-3 bg-clip-border text-gray-700 shadow-none">
  <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
    <img
      src={image}
      alt="tania andrew"
      className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
    />
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Name: {parcel?.name}
        </h5>
        <h2 className="text-xl flex ">{parcel?.review} <FaStar className='text-red-500 text-lg'></FaStar></h2>
      </div>
      <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
       Date:  {parcel?.Review_Giving_Date}
      </p>
    </div>
  </div>
  <div className="p-0 mb-6">
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
     {parcel?.feedback_Text}
    </p>
  </div>
</div>



            </div>)
        }
        </div>
        
        </div>
    );
};

export default Reviews;