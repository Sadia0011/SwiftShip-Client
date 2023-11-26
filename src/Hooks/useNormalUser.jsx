import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useNormalUser = () => {
    const {user,loading}=useAuth()
    const axiosSecure=useAxiosSecure();

const {data:isNormalUser=false,isLoading:isNormalUserLoading}=useQuery({
    queryKey:["isNormalUser",user?.email],
    enabled:!loading,
    queryFn:async()=>{
       const res=await axiosSecure.get(`/users/normalUser/${user?.email}`)
       console.log("from NormalUser hook",res.data)
       return res.data.normalUser;
    }
})
return [isNormalUser,isNormalUserLoading]
};

export default useNormalUser;