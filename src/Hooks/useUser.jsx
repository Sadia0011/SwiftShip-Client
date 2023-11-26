import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
    const axiosPublic=useAxiosPublic();
    const {user}=useAuth()
    // tanstack query
    const {refetch,data:bookParcel=[]}=useQuery({
    queryKey:['bookParcel',user?.email],
    queryFn:async()=>{
        const res=await axiosPublic.get(`/bookParcel?email=${user.email}`)
        return res.data;
    }
    })
    return [bookParcel,refetch]
};

export default useUser;