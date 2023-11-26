import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { FaBicycle, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure=useAxiosSecure();
    const {data: allUsers=[],refetch}=useQuery({
        queryKey:["allUser"],
        queryFn:async()=>{
         const res= await axiosSecure.get("/users")
         console.log(res.data)
         return res.data
        }
    })


    const handleMakeAdmin=(user)=>{
        console.log("Making user admin:", user._id);
      axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res=>{
       console.log(res.data)
       if(res.data.modifiedCount >0){
        refetch()
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin now`,
            showConfirmButton: false,
            timer: 1500
          });
    }
})
    }
    const handleMakeDeliveryMan=(user)=>{
        console.log("Making user deliveryman:", user._id);
axiosSecure.patch(`/users/deliveryman/${user._id}`)
.then(res=>{
    console.log(res.data)
    if(res.data.modifiedCount >0){
        refetch()
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is a delivery man now`,
            showConfirmButton: false,
            timer: 1500
          });
    }
})
    }

    return (
        <div>
<SectionTitle heading={"All Users"} subheading={"User's Information"}></SectionTitle>
            <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>User's Name</th>
        <th>Phone Number</th>
        <th>Number of Percel Booked</th>
        <th>Admin</th>
        <th>Delivery Men</th>
      </tr>
    </thead>
    <tbody>
      {allUsers.map((user,index)=><tr key={user._id}>
        <th>{index+1}</th>
        <td>{user?.displayName}</td>
        <td>{user.email}</td>
        <td>Quality Control Specialist</td>
        <td> {user.role === 'admin' ?'Admin': <button
          onClick={()=>handleMakeAdmin(user)}
          className="btn bg-blue-400 btn-lg"
          disabled={user.role === "deliveryman"}>
               <FaUsers className='text-white text-2xl'>
            </FaUsers></button>}</td>
        <td>{user.role === 'deliveryman' ?'Delivery Man': <button
          onClick={()=>handleMakeDeliveryMan(user)}
          className="btn bg-blue-400 btn-lg"
          disabled={user.role === "admin"}>
          <FaBicycle className='text-white text-2xl'></FaBicycle></button>}</td>
      </tr>)}
      
     
    
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default AllUsers;