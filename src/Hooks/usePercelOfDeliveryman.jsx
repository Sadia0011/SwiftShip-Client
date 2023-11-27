import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const usePercelOfDeliveryman = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()

    const {data:loggedInUser=[]}=useQuery({
        queryKey:["loggedInUser"],
        queryFn:async()=>{
         const res=await axiosSecure.get(`/getLoggedInId/${user?.email}`)
            return res.data._id
        }
      })
      console.log(loggedInUser)
  
    const {data:allPercelOfDeliveryman=[],refetch}=useQuery({
        queryKey:["allPercelOfDeliveryman"],
        queryFn:async()=>{
         const res=await axiosSecure.get(`/deliverymanId/${loggedInUser}`)
            return res.data
        }
      })
      console.log(allPercelOfDeliveryman)
      return[allPercelOfDeliveryman,refetch]
};

export default usePercelOfDeliveryman;