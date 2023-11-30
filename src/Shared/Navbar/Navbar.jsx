import React from 'react';
import { GrSwift } from "react-icons/gr";
import { Link, NavLink } from 'react-router-dom';
import { IoMdNotifications } from "react-icons/io";
import useAuth from '../../Hooks/useAuth';
const Navbar = () => {
  const {user,logout,role}=useAuth()
  console.log(user,role)
  let linkPath = "";

  if (role === "admin") {
    linkPath = "/dashboard/admin/statistics";
  } else if (role === "deliveryman") {
    linkPath = "/dashboard/deliveryman/deliverymanHome";
  } else if (role === "user") {
    linkPath = "/dashboard/user/userHome";
  }
    const navLinks=<>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/contact"}>Contact</NavLink></li>
    <li><NavLink to={"/about"}>About Us</NavLink></li>
    <li>
        {role === "admin" && <Link to={linkPath}>Dashboard</Link>}

        {role === "deliveryman" && <Link to={linkPath}>Dashboard</Link>}

        {role === "user" && <Link to={linkPath}>Dashboard</Link>}
      </li>
    <li><Link to={"/dashboard/cart"}><button className="btn btn-sm">
        <IoMdNotifications ></IoMdNotifications>
         <div className="badge  bg-blue-800 text-white">+{}</div>
         </button></Link></li>
    
    </>
    
const handleLogout=()=>{
  logout();
}


    return (
        <div className="navbar bg-slate-100 lg:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl"><GrSwift className='text-blue-800'></GrSwift> SwiftShip</a>
        </div>
        <div className="navbar-center  hidden lg:flex">
          <ul className="menu menu-horizontal px-1 relative z-10">
           {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
        {user ?<>
          <div className="dropdown dropdown-left">
  <label tabIndex={0} className="btn m-1 avatar">  
  <div className="w-24 rounded-full">
    <img src={user.photoURL} alt="" />
  </div>
</label>
  <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><NavLink to="/">{user.displayName}</NavLink></li>
    <li>
        {role === "admin" && <Link to={linkPath}>Dashboard</Link>}

        {role === "deliveryman" && <Link to={linkPath}>Dashboard</Link>}

        {role === "user" && <Link to={linkPath}>Dashboard</Link>}
      </li>
    <button onClick={handleLogout} className='btn'>logout</button>
  </ul>
</div>
</> : <NavLink to="/login">Login</NavLink>}
        </div>
      </div>
    );
};

export default Navbar;