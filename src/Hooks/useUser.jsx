import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUser = () => {
    const axiosPublic=useAxiosPublic();
    const axiosSecure=useAxiosSecure();
    const {user}=useAuth()
    // tanstack query
    const {refetch,data:bookParcel=[]}=useQuery({
    queryKey:['bookParcel',user?.email],
    queryFn:async()=>{
        const res=await axiosSecure.get(`/bookParcelByEmail?email=${user.email}`)
        return res.data;
    }
    })
    return [bookParcel,refetch]
};

export default useUser;