import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useGetAllDeliveryman = () => {
    const axiosSecure=useAxiosSecure()
    const {data:allDeliveryman=[],refetch}=useQuery({
        queryKey:["allDeliveryman"],
        queryFn:async()=>{
         const res=await axiosSecure.get("/allDeliveryman")
            return res.data
        }
      })
    //   console.log(allDeliveryman)
      return[allDeliveryman]
};

export default useGetAllDeliveryman;