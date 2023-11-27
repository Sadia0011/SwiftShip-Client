import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, 
    LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';

const Login = () => {
    const [disabled,setDisabled]=useState(true)
const {singIn}=useContext(AuthContext)
const navigate=useNavigate();
const location=useLocation()
const from = location.state?.from?.pathname || "/";
    useEffect(()=>{
        loadCaptchaEnginge(6)
    },[])
    const handleLogin=e=>{
        e.preventDefault();
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password)
        singIn(email,password)
        .then(result=>{
            const user=result.user;
            console.log(user);
            Swal.fire({
                title: "user logged in successfully",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
              navigate(from, { replace: true });
        })
    }
    const handleValidateCaptcha=(e)=>{
        const user_captchaValue=e.target.value;
        console.log(user_captchaValue);
        if (validateCaptcha(user_captchaValue)==true) {
            // alert('Captcha Matched');
            setDisabled(false)
        }
   
        else {
            // alert('Captcha Does Not Match');
            setDisabled(true)
        }
    }
    return (
        <>
   <TitleHelmet title={"Login"}></TitleHelmet>
       <div>
       <h1 className="text-5xl font-bold text-center my-5">Login now!</h1>
       <div className="hero   mb-5">
   <div className="flex  justify-center gap-3 items-center flex-col lg:flex-row-reverse">
     <div className=" flex-1 text-center ">
       
      <img src="https://i.ibb.co/YyrHnbq/login.jpg" className='lg:w-[700px] object-cover' alt="" />
        </div>
     <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
       <form onSubmit={handleLogin} className="card-body">
         <div className="form-control">
           <label className="label">
             <span className="label-text">Email</span>
           </label>
           <input type="email" name='email' placeholder="email" className="input input-bordered" required />
         </div>
         <div className="form-control">
           <label className="label">
             <span className="label-text">Password</span>
           </label>
           <input type="password" name='password' placeholder="password" className="input input-bordered" required />
         </div>
         <div className="form-control">
           <label className="label">
           <LoadCanvasTemplate />
           </label>
           <input 
           onBlur={handleValidateCaptcha} 
           type="text" name='captcha' placeholder="type the captcha above" 
           className="input input-bordered"  /> 
        </div>
         <div className="form-control mt-3">
           <input 
          //  disabled={false} 
           type="submit" className='btn btn-primary' value="Login" />
         </div>
       </form>
       <p className='lg:px-10'>New Here? <Link to={"/signup"}>Sign Up</Link></p>
     <SocialLogin></SocialLogin>
     </div>
   </div>
 </div>
       </div>
        </>
    );
};

export default Login;