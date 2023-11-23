import React from 'react';
import { GrShop, GrSwift } from 'react-icons/gr';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaCalendar, FaHome, FaList, FaMailBulk, FaPizzaSlice, FaReact, FaSeedling, FaShoppingBag, FaShoppingCart, FaUser, FaUsers, FaUtensilSpoon } from 'react-icons/fa';
import {MdDeliveryDining } from 'react-icons/md'
import {FcStatistics  } from 'react-icons/fc'
const Dashboard = () => {
    const isAdmin=true
    return (
        <div className='flex'>
            <div className='min-h-screen w-64 bg-slate-200'>
            <h2 className="text-2xl italic font-bold py-5 flex items-center">
                <GrSwift className='mr-2'></GrSwift> Swiftship</h2>

                <ul className='menu p-7'>
            {isAdmin ?<>
               <li>
               <NavLink to={"/dashboard/adminHome"}> 
               <FaHome></FaHome> Admin Home</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/percel"}> 
               <GrShop></GrShop> All percels</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/users"}> 
                <FaUsers></FaUsers> All Users</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/Bookings"}> 
               <MdDeliveryDining></MdDeliveryDining> All Delivary Man</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/Users"}> 
               <FcStatistics></FcStatistics> Satistics</NavLink>
            </li></> :
            <>
            <li>
               <NavLink to={"/dashboard/userHome"}> 
               <FaHome></FaHome> User Home</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/reservation"}> 
               <FaCalendar></FaCalendar> Reservation</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/cart"}> 
               <FaShoppingCart></FaShoppingCart> My Cart({cart.length})</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/review"}> 
               <FaReact></FaReact> Review</NavLink>
            </li>
            <li>
               <NavLink to={"/dashboard/bookings"}> 
               <FaList></FaList> My Bookings</NavLink>
            </li>
            </>}

            {/* shared */}
            <div className='divider'></div>
            <li>
               <NavLink to={"/"}> 
               <FaHome></FaHome> Home</NavLink>
            </li>
            <li>
               <NavLink to={"/menu"}> 
               <FaPizzaSlice></FaPizzaSlice> Menu</NavLink>
            </li>
            <li>
               <NavLink to={"/order/salad"}> 
               <FaShoppingBag></FaShoppingBag> Shop</NavLink>
            </li>
            <li>
               <NavLink to={"/contact"}> 
               <FaMailBulk></FaMailBulk> Contact</NavLink>
            </li>
           </ul>
            </div>

            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;