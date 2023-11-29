
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
const SignUp = () => {
    const axiosPublic=useAxiosPublic()
    const navigate=useNavigate()
      const {
          register,
          handleSubmit,
          watch,
          reset,
          formState: { errors },
        } = useForm()
        const {createUser ,updateUserProfile}=useContext(AuthContext)

        const onSubmit = (data) =>{
           console.log(data)
          createUser(data.email,data.password)
          .then(result=>{
              const loggedUser=result.user;
              console.log(loggedUser);
              updateUserProfile(data.name,data.photo)
              .then(()=>{
                  console.log("user info update process")
                 const userInfo={
                  name:data.name,
                  email:data.email,
                  phone:data.phone,
                  image:data.photo,
                  role:"user"
                 
                 }
                 console.log("user info",userInfo)
                 axiosPublic.post('/users', userInfo)
                 .then(res => {
                  console.log(res.data)
                     if (res.data.insertedId) {
                         console.log('user added to the database')
                         reset();
                         Swal.fire({
                             position: 'top-end',
                             icon: 'success',
                             title: 'User created successfully.',
                             showConfirmButton: false,
                             timer: 1500
                         });
                         navigate('/');
                     }
                 })
                 
                  
              })
              .catch(error=>console.error())
          })
          };
    return (
       <>
       <TitleHelmet title={"SignUp"}></TitleHelmet>
       <h1 className="text-5xl font-bold my-5 text-center">Sign Up now!</h1>
       <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            
            <img src="https://i.ibb.co/YyrHnbq/login.jpg" className='lg:w-[700px] object-cover' alt="" />
           </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body" >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name*</span>
                </label>
                <input type="name"{...register("name" ,{ required: true })} placeholder="name" className="input input-bordered"  />
                {errors.name && <span className='text-red-600'>This field is required</span>}
            
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo*</span>
                </label>
                <input type="photo"{...register("photo" ,{ required: true })} placeholder="name" className="input input-bordered"  />
                {errors.photo && <span className='text-red-600'>photo is required</span>}
            
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email*</span>
                </label>
                <input type="email" {...register("email",{ required: true })} placeholder="email" className="input input-bordered"  />
                {errors.email && <span className='text-red-600'>This field is required</span>}
            
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone*</span>
                </label>
                <input type="tel" {...register("phone",{ required: true })} placeholder="phone number" className="input input-bordered"  />
                {errors.email && <span className='text-red-600'>This field is required</span>}
            
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password*</span>
                </label>
                <input type="password" {...register("password",{ 
                    required: true ,
                    minLength:6,
                    maxLength:20 ,
                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                    })} placeholder="password" className="input input-bordered"  />
                {errors.password && <span className='text-red-600'>This field is required</span>}
                {errors.password?.type==='minLength' && <span className='text-red-600'>password must be 6 characters</span>}
                {errors.password?.type==='maxLength' && <span className='text-red-600'>password must be less than 20 characters</span>}
                {errors.password?.type==='pattern' && <span className='text-red-600'>
                    password must have one uppercase,one lowercase,one number,one special character.</span>}
            
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-2">
                <input type="submit" value="Sign up"className="btn btn-primary" />
               
              </div>
            </form>
            <p className='lg:px-8'>Already have an account? <Link className='underline' to={"/login"}>Login</Link></p>
          <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
       </>
    );
};

export default SignUp;