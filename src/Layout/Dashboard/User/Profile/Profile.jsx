import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { FaPhotoVideo, FaUserCircle } from 'react-icons/fa';
import useUser from '../../../../Hooks/useUser';
import axios from 'axios';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';

const image_hosting_key=import.meta.env.VITE_Image_Hosting_api;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Profile = () => {
    const {user,updateUserProfileImage}=useAuth();
    const[bookParcel]=useUser()
    const axiosPublic=useAxiosPublic()
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm()
  
    const onSubmit = async(data) => {
      console.log(data)
      const imageFile = { image: data.image[0] }
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
              'content-type': 'multipart/form-data'
          }
          
      });
      if(res.data.success){
        const photo=res.data.data.display_url;
            updateUserProfileImage(photo)
            .then(res=>console.log("user image updated"))
      }
  console.log( "image",res.data)
    }
  


    return (
        <div>
           <SectionTitle heading={user.displayName} subheading={"Profile of "}></SectionTitle>
       
       <div className='flex flex-col justify-center items-start space-y-3'>
       <div className="avatar">
  <div className=" w-10 lg:w-40 lg:max-w-4xl mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src={user?.photoURL ? user.photoURL : <FaUserCircle></FaUserCircle>} />
   
  </div>
</div>
<h2 className="text-2xl"><span className='font-bold'>Name: </span>{user.displayName}</h2>
<h2 className="text-2xl"><span className='font-bold'>Email: </span>{user.email}</h2>
<h2 className="text-2xl mb-5"><span className='font-bold'>Total Booking Parcel: </span>{bookParcel.length}</h2>
</div>
{/* upload pro pic */}
<form onSubmit={handleSubmit(onSubmit)}>
<div className="form-control w-full my-6">
<input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
</div>
    <button className='btn  bg-slate-400 hover:bg-slate-900 hover:text-white'>Upload <FaPhotoVideo></FaPhotoVideo></button>
    </form>
        </div>
    );
};

export default Profile;