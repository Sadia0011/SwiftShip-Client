import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import usePercelOfDeliveryman from '../../../Hooks/usePercelOfDeliveryman';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import CardTopDeliveryman from './CardTopDeliveryman';

const TopDeliveryMan = () => {

    const axiosSecure=useAxiosSecure()
    const{data:topDeliveryman=[],refetch}=useQuery({
        queryKey:["topDeliveryman"],
        queryFn:async()=>{
           const res=await axiosSecure.get("/topDeliveryMen")
           console.log(res.data)
           return res.data
        }
    })
    return (
        <div>
            <SectionTitle heading={"Top Delivery Man"} subheading={"Deliver with Precision, Receive with Ease"}></SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5'>
            {topDeliveryman.slice(0,5).map(man=><CardTopDeliveryman
            key={man._id}
            man={man}></CardTopDeliveryman>)}
        </div>
        
        </div>
    );
};

export default TopDeliveryMan;