import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useDeliveryman = () => {
    const {user,loading}=useAuth()
    const axiosSecure=useAxiosSecure();

const {data:isDeliveryman=false,isLoading:isDeliverymanLoading}=useQuery({
    queryKey:["isDelivaryman",user?.email],
    enabled:!loading,
    queryFn:async()=>{
       const res=await axiosSecure.get(`/users/deliveryman/${user?.email}`)
      console.log("from deliveryman hook",res.data)
       return res.data.deliveryman;
    }
})
return [isDeliveryman,isDeliverymanLoading]
};

export default useDeliveryman;