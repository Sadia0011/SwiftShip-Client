import React from 'react';
import { FaStar } from 'react-icons/fa';

const CardTopDeliveryman = ({man}) => {
    const{name,image,deliveredParcelCount,sum,reviewedParcelCount}=man;
    return (
        <div>
            <div className="relative flex flex-col text-gray-700 bg-slate-100 shadow-md bg-clip-border rounded-xl">
  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
    <img src={image} alt="profile-picture" />
  </div>
  <div className="p-6 text-center">
    <h4 className="block mb-2 text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {name}
    </h4>
    <p
      className="block text-base antialiased font-medium leading-relaxed  bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
      Number of parcel Delivered: {deliveredParcelCount}
    </p>
    <p
      className="flex justify-center items-center text-base antialiased font-medium leading-relaxed  bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
      Average Ratings: {(sum/reviewedParcelCount).toFixed(2)} <FaStar className='text-red-600'></FaStar>
    </p>
  </div>
</div>
        </div>
    );
};

export default CardTopDeliveryman;