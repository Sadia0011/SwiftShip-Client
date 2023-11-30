import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import {  AiOutlineSafety } from "react-icons/ai";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { FaBicycle, FaBook, FaCalendar, FaList, FaShopify, FaUsers } from 'react-icons/fa';
import CountUp from 'react-countup';
const FeaturedSection = () => {
  const [parcelBooked, setParcelBooked] = useState(0);
  const [parcelDelivered, setParcelDelivered] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const axiosPublic=useAxiosPublic()
  useEffect(()=>{
    axiosPublic.get("/parcelBooked")
    .then(res => setParcelBooked(res.data.parcelBooked))
    .catch(error => console.error('parcel booked:', error));

    axiosPublic.get("/parcelDelivered")
    .then(res => setParcelDelivered(res.data.parcelDelivered))
    .catch(error => console.error('parcel delivered:', error));

    axiosPublic.get("/registeredUsers")
    .then(res => setRegisteredUsers(res.data.registeredUsers))
    .catch(error => console.error('registeredUsers:', error));

  },[axiosPublic])
    return (
        <div>
           <SectionTitle heading={"Our Featured Section"} subheading={"Your Parcel, Our Priority"}></SectionTitle>

           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
            
             

<div className="max-w-sm p-6 h-[280px] bg-blue-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <AiOutlineSafety className='text-4xl'></AiOutlineSafety>
    <h5 className="mb-2 text-2xl font-semibold tracking-tight
     text-gray-900 dark:text-white">Parcel Safety Assurance:</h5>
    <p className="text-sm lg:text-base mb-3 font-normal text-gray-500 dark:text-gray-400">
    At SwiftShip, the safety of your parcels is our top priority. We employ 
    robust security measures at every stage of the 
    delivery process to ensure that your items are handled with care. </p>
</div>
<div className="max-w-sm p-6 h-[280px] bg-green-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <MdOutlineDeliveryDining className='text-5xl'></MdOutlineDeliveryDining>
    <h5 className="mb-2 text-2xl font-semibold tracking-tight
     text-gray-900 dark:text-white">Superfast Delivery Network:</h5>
    <p className="text-sm lg:text-base mb-3 font-normal text-gray-500 dark:text-gray-400">
    Experience the thrill of superfast deliveries with SwiftShip's agile and efficient delivery network. We understand the value of time, and our streamlined processes and
     optimized routes enable us to deliver your parcels with unprecedented speed.  </p>
</div>
<div className="max-w-sm p-6 h-[280px] bg-orange-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <CgCommunity className='text-5xl'></CgCommunity>
    <h5 className="mb-2 text-2xl font-semibold tracking-tight
     text-gray-900 dark:text-white">Transparent Tracking and Communication:</h5>
    <p className="text-sm lg:text-base mb-3 font-normal text-gray-500 dark:text-gray-400">
    Stay in the loop with SwiftShip's transparent tracking and communication features. Our real-time tracking system allows you to monitor your parcel's journey from pick-up to delivery.  </p>
</div>

        
           
           </div>
<div>
 <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">From Booking to Delivery, Faster Than Ever</h5>
    <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400"> Book parcels for delivery, let our efficient Admin assign the right delivery person, and experience swift and secure deliveries. Your packages, our priority.</p>
    {/* <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <div className="w-full sm:w-auto bg-slate-200 text-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300  rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
           <FaCalendar className='w-7'></FaCalendar> <div className="text-left rtl:text-right">
                <div className="mb-1 text-xs">Parcel booked :</div>
                <div className="-mt-1  text-sm font-semibold"><CountUp end={parcelBooked} duration={3}></CountUp></div>
            </div>
        </div>
        <div className="w-full sm:w-auto bg-slate-200 text-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300  rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
           <FaShopify className='w-7'></FaShopify>  <div className="text-left rtl:text-right">
                <div className="mb-1 text-xs">Parcel delivered :</div>
                <div className="-mt-1  text-sm font-semibold"><CountUp end={parcelDelivered} duration={3}></CountUp></div>
            </div>
        </div>
        <div className="w-full sm:w-auto bg-slate-200 text-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300  rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
          <FaUsers className='w-7'></FaUsers>  <div className="text-left rtl:text-right">
                <div className="mb-1 text-xs">People using this app :</div>
                <div className="-mt-1  text-sm font-semibold"><CountUp end={registeredUsers} duration={3}></CountUp></div>
            </div>
        </div>
    </div> */}
    <div className="stats shadow">
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FaBook className='text-3xl'></FaBook>
         </div>
    <div className="stat-title">Parcel booked</div>
    <div className="stat-value"><CountUp end={parcelBooked} duration={3}></CountUp></div>
    
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
     <FaBicycle className='text-4xl'></FaBicycle>
    </div>
    <div className="stat-title">Parcel delivered</div>
    <div className="stat-value"><CountUp end={parcelDelivered} duration={3}></CountUp></div>
    
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
     <FaUsers className='text-3xl'></FaUsers>
    </div>
    <div className="stat-title">Users</div>
    <div className="stat-value"><CountUp end={registeredUsers} duration={3}></CountUp></div>
    
  </div>
  
</div>
</div>

</div>
        </div>
    );
};

export default FeaturedSection;