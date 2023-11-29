import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const usePercelOfDeliveryman = () => {
    const axiosSecure=useAxiosSecure()
    const {user,loading}=useAuth()


    let deliveredParcelCount = 0;
    let averageReview = 0;


    const {data:loggedInUser=null}=useQuery({
        queryKey:["loggedInUser"],
        enabled:!loading,
        queryFn:async()=>{
         const res=await axiosSecure.get(`/getLoggedInId/${user?.email}`)
            return res.data._id
        }
      })
      // console.log("loggedInUser from hook",loggedInUser)
  
    const {data:allPercelOfDeliveryman=[],refetch}=useQuery({
        queryKey:["allPercelOfDeliveryman"],
        enabled:!loading,
        queryFn:async()=>{
         const res=await axiosSecure.get(`/deliverymanId/${loggedInUser}`)
            return res.data
        }
      })
    // const {data:deliverymanWithId=[]}=useQuery({
    //     queryKey:["deliverymanWithId"],
    //     enabled:!loading,
    //     queryFn:async()=>{
    //      const res=await axiosSecure.get(`/deliverymanWithId?email=${user.email}`)
    //         return res.data
    //     }
    //   })
    //   console.log("deliverymanWithId",deliverymanWithId)


// const{data:countForDeliveryman={}}=useQuery({
//   queryKey:['countForDeliveryman'],
//   queryFn:async()=>{
//      const res=await axiosSecure.get(`/countForDeliveryman/${loggedInUser}`)
//      console.log(res.data.deliveredParcelCount)
//      console.log(res.data.averageReview)
//      deliveredParcelCount=res.data.deliveredParcelCount
//      averageReview=res.data.averageReview
//      return {deliveredParcelCount,averageReview};
//   }
// })

// const{data:addCountForDeliveryman={}}=useQuery({
//   queryKey:['addCountForDeliveryman'],
//   queryFn:async()=>{
//     const updatedDoc={
//       deliveredParcelCount:deliveredParcelCount,
//       averageReview:averageReview
//     }
//     console.log("updatedDoc",updatedDoc)
//      const res=await axiosSecure.patch(`/addCountForDeliveryman/${loggedInUser}`,updatedDoc)
//      console.log("hello from addCountForDeliveryman",res.data)
//      return res.data;
//   }
// })




//       return[allPercelOfDeliveryman,refetch,loggedInUser,countForDeliveryman,addCountForDeliveryman]
      return[allPercelOfDeliveryman,refetch]
};

export default usePercelOfDeliveryman;