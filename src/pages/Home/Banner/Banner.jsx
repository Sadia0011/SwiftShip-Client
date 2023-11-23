import React from 'react';

const Banner = () => {
    return (
      
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://i.ibb.co/TgLnXN2/banner.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">Deliver with Precision, Receive with Ease</h1>
          <p className="mb-5">SwiftShip is a seamless Parcel Management App built on the MERN stack. Book parcels for delivery, let our efficient Admin assign the right delivery person, and experience swift and secure deliveries. Your packages, our priority.</p>
          <div className="join">
  <input className="input input-bordered join-item" placeholder="Type Here"/>
  <button className="btn join-item rounded-r-full">Search</button>
</div>
        </div>
      </div>
    </div>
    );
};

export default Banner;