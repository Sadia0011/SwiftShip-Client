import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

 const axiosSecure=axios.create({
    baseURL:'http://localhost:5000/'
})
const useAxiosSecure = () => {
    const navigate=useNavigate();
    const {logout}=useAuth()

    axiosSecure.interceptors.request.use(function(config){
        // console.log("stopped by interceptors")
        const token=localStorage.getItem('access-token')
        // console.log("stopped by interceptors",token)
        config.headers.authorization=`Bearer ${token}`;
        return config;
    },function(error) {
        // Do something with request error
        return Promise.reject(error);
      })

// interceptors 401 403
axios.interceptors.response.use(function (response) {
    return response;
  },  async(error)=>{
    const status=error.response.status;
  
    if(status === 401 || status === 403){
        await logout();
          navigate("/login")
    }
    return Promise.reject(error);
  }
  );

    return axiosSecure;
};

export default useAxiosSecure;