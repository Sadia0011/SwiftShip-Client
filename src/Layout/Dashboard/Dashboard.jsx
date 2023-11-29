import React from 'react';
import { GrShop, GrSwift } from 'react-icons/gr';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaCalendar, FaDatabase, FaHome, FaList, FaMailBulk, FaPizzaSlice, FaReact, FaSeedling, FaShoppingBag, FaShoppingCart, FaUser, FaUsers, FaUtensilSpoon } from 'react-icons/fa';
import {MdDeliveryDining } from 'react-icons/md'
import {FcStatistics  } from 'react-icons/fc'
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';
import useAdmin from '../../Hooks/useAdmin';
import useDeliveryman from '../../Hooks/useDeliveryman';
import useNormalUser from '../../Hooks/useNormalUser';
const Dashboard = () => {
    const [isAdmin]=useAdmin()
   //  const isAdmin=false
   //  const user=true
    const [isNormalUser]=useNormalUser();
   //  const Deliveryman=true
    const [isDeliveryman]=useDeliveryman()
    return (
       <>
       <TitleHelmet title={"DashBoard"}></TitleHelmet>
       <div className='flex'>
            <div className='min-h-screen w-64 bg-slate-200'>
            <h2 className="text-2xl italic font-bold py-5 flex items-center">
                <GrSwift className='mr-2'></GrSwift> Swiftship</h2>

                <ul className='menu p-7'>
            {isAdmin===true && 
            <>
            <h2 className="text-2xl underline italic font-bold text-center mb-3">
                 Admin </h2>
               <li>
               <NavLink to={"/dashboard/admin/adminHome"}> 
               <FaHome></FaHome> Admin Home</NavLink>
            </li>
               <li>
               <NavLink to={"/dashboard/admin/statistics"}> 
               <FcStatistics></FcStatistics> Satistics</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/admin/allParcel"}> 
               <GrShop></GrShop> All percels</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/admin/allUsers"}> 
                <FaUsers></FaUsers> All Users</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/admin/allDeliveryman"}> 
               <MdDeliveryDining></MdDeliveryDining> All Delivary Man</NavLink>
            </li>
           </> }
           {isNormalUser===true &&
            <>
            <h2 className="text-2xl underline italic font-bold text-center mb-3">
                User </h2>
            <li>
               <NavLink to={"/dashboard/user/userHome"}> 
               <FaHome></FaHome> User Home</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/user/bookParcel"}> 
               <FaCalendar></FaCalendar> Book a parcel</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/user/myParcel"}> 
               <FaShoppingCart></FaShoppingCart> My Parcel</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/user/profile"}> 
               <FaUser></FaUser> Profile </NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/user/paymentHistory"}> 
               <FaList></FaList> Payment History </NavLink>
            </li>
            
            </>}
            {isDeliveryman===true && 
               <>
               <h2 className="text-2xl underline italic font-bold text-center mb-3">
                 Deliveryman </h2>
               <li>
               <NavLink to={"/dashboard/deliveryman/deliverymanHome"}> 
               <FaHome></FaHome> DeliveryMan Home</NavLink>
            </li>
               
            <li>
               <NavLink to={"/dashboard/deliveryman/deliveryList"}> 
               <FaList></FaList> Delivery List</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/deliveryman/reviews"}> 
               <FaReact></FaReact> Reviews</NavLink>
            </li>
               </>
            }



            {/* shared */}
            <div className='divider'></div>
            <li>
               <NavLink to={"/"}> 
               <FaHome></FaHome> Home</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard"}> 
               <FaDatabase></FaDatabase> Dashboard</NavLink>
            </li>
            
           </ul>
            </div>

            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
       </>
    );
};

export default Dashboard;