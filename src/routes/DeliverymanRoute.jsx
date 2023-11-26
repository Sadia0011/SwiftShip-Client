import React from 'react';
import useAuth from '../Hooks/useAuth';
import useDeliveryman from '../Hooks/useDeliveryman';
import { useLocation } from 'react-router-dom';

const DeliverymanRoute = ({ children }) => {
    const {user,loading}=useAuth()
    const [isDelivaryman,isDelivarymanLoading]=useDeliveryman()
    const location=useLocation();
    if(loading || isDelivarymanLoading){
        return <progress className="progress progress-accent w-56" value="100" max="100"></progress>
    }
    if(user && isDelivaryman){
      return  children;
    }
    return <Navigate to={"/login"} state={{from :location}} replace></Navigate>
};

export default DeliverymanRoute;