import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { FaBicycle, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import "./AllUsers.css"


const AllUsers = () => {
    const axiosSecure=useAxiosSecure();
    
    // const {data: allUsers=[],refetch}=useQuery({
    //     queryKey:["allUser"],
    //     queryFn:async()=>{
    //      const res= await axiosSecure.get("/users")
    //      console.log(res.data)
    //      return res.data
    //     }
    // })
   
  //   const parcelBooked =  (email) => {
  //     const url=`http://localhost:5000/parcelBooked/${email}`
  //     const result =  fetch(url);
     
      
  //     console.log(result)
  //     return result.parcelBooked;
  //  }

const parcelBooked=(email)=>{
  let temp;
       console.log("hello from parcel booked",email);
      fetch(`http://localhost:5000/parcelBooked/${email}`)
        .then(res=>res.json())
        .then(data=>{
        console.log("email",email,data.parcelBooked);
         temp=data.parcelBooked;
        console.log(temp);
        
        })
     return temp;
      }
  
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


// pagination
    const [count,setCount]=useState(0)
    const [users,setUsers]=useState([])
    const [realUsers,setRealUsers]=useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/itemsCount")
        .then(res=>res.json())
        .then(data=>setCount(data))
        // console.log({count})
    },[])
   const total=parseInt(count.count)

    const[itemsPerPage,setItemsPerPage]=useState(5)
    const[currentPage,setCurrentPage]=useState(0)
   const numberOfPages=Math.ceil(total/itemsPerPage)
   console.log( numberOfPages)
// const pages=[...Array(numberOfPages).keys()]
// console.log(pages)

const pages=[]
for(let i=0;i < numberOfPages;i++){
pages.push(i)
}
// console.log(pages)

    useEffect(() => {
      axiosSecure.get(`/items?page=${currentPage}&size=${itemsPerPage}`)
      .then(res=>{
        setRealUsers(res.data)
        setUsers(res.data)
      })
        // fetch(`http://localhost:5000/users?page=${currentPage}&size=${itemsPerPage}`)
            // .then(res => res.json())
            // .then(data => {
            // setRealUsers(data)
            // setUsers(data)})
    }, [axiosSecure,currentPage,itemsPerPage]);
console.log("users",users)
console.log("real users",realUsers)
    const handleItemsPerPage=e=>{
        const val=parseInt(e.target.value);
        console.log(val)
        setItemsPerPage(val)
        setCurrentPage(0)
    }
    const handlePrevPage=()=>{
        if(currentPage>0){
            setCurrentPage(currentPage-1)
        }
    }
    const handleNextPage=()=>{
        if(currentPage<pages.length-1){
            setCurrentPage(currentPage+1)
        }
    }




    return (
        <div>
<SectionTitle heading={"All Users"} subheading={"User's Information"}></SectionTitle>
            <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra overflow-x-auto">
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
       {users.map((user,index)=>
      <tr key={user._id}>
        <th>{index+1}</th>
        <td>{user?.name}</td>
        <td>{user?.phone}</td>
        <td>
          {parcelBooked(user.email)}
        </td>
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

{/* pagination */}
<div className='pagination'>
              
              <button onClick={handlePrevPage}>Prev</button>
               {pages.map(page=> <button
               className={currentPage==page ? 'selected' :undefined}
               onClick={()=>setCurrentPage(page)}
                key={page}>{page}</button>)}
                <button onClick={handleNextPage}>Next</button>
              
            <select value={itemsPerPage}
            onChange={handleItemsPerPage}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="50">50</option>
            </select>
            
            </div>
            </div>
        </div>
    );
};

export default AllUsers;