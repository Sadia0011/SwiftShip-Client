import React, { useContext } from 'react';
import {FaGoogle} from "react-icons/fa"
// import useAxiosPublic from '../../Hook/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const SocialLogin = () => {
    const {googleSignIn}=useContext(AuthContext)
    const axiosPublic=useAxiosPublic();
    const navigate=useNavigate()
    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(res=>{
            console.log(res.user)
            const userInfo={
                email:res.user?.email,
                name:res.user?.displayName,
                phone:res.user?.phoneNumber,
                image:res.user?.photoURL,
                role:"user"
            }
            axiosPublic.post("/users",userInfo)
            .then(res=>console.log(res.user))
            navigate("/")
        })
        .catch(error=>console.error(error))
    }
    return (
        <div className='p-3'>
            <div className='divider'></div>
       <button
       onClick={handleGoogleSignIn}
       className='btn btn-primary btn-outline w-full '> 
       <FaGoogle className='mr-2'></FaGoogle>
       Google</button>
        </div>
    );
};

export default SocialLogin;