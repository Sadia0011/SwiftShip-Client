import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';
const Slider = () => {
    return (
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
            
        <div className="hero min-h-screen" style={{
            backgroundImage: 'url(https://i.ibb.co/TgLnXN2/banner.jpg)',
            objectFit:"cover"}}>
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-slate-100">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold">Deliver with Precision, Receive with Ease</h1>
          <div className="join mb-5">
  <input className="input input-bordered join-item" placeholder="Type Here"/>
  <button className="btn join-item rounded-r-full">Search</button>
</div>
          <p className="mb-5">SwiftShip is a seamless Parcel Management App built on the MERN stack. Book parcels for delivery, let our efficient Admin assign the right delivery person, and experience swift and secure deliveries. Your packages, our priority.</p>
         
        </div>
      </div>
    </div>
        </SwiperSlide>
        <SwiperSlide>
            
        <div className="hero min-h-screen" style={{
            backgroundImage: 'url(https://i.ibb.co/tmx329c/banner3.jpg)',
            objectFit:"cover"}}>
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-slate-100">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold">Connecting Destinations, One Parcel at a Time</h1>
          <div className="join mb-5">
  <input className="input input-bordered join-item" placeholder="Type Here"/>
  <button className="btn join-item rounded-r-full">Search</button>
</div>
          <p className="mb-5">SwiftShip is a seamless Parcel Management App built on the MERN stack. Book parcels for delivery, let our efficient Admin assign the right delivery person, and experience swift and secure deliveries. Your packages, our priority.</p>
         
        </div>
      </div>
    </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="hero min-h-screen" style={{
            backgroundImage: 'url(https://i.ibb.co/fkcM9K2/banner2.jpg)',
            objectFit:"cover"}}>
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-slate-100">
        <div className="max-w-2xl ">
          <h1 className="mb-5 text-5xl font-bold">From Booking to Delivery, Faster Than Ever</h1>
          <div className="join mb-5">
  <input className="input input-bordered join-item" placeholder="Type Here"/>
  <button className="btn join-item rounded-r-full">Search</button>
</div>
          <p className="mb-5">SwiftShip is a seamless Parcel Management App built on the MERN stack. Book parcels for delivery, let our efficient Admin assign the right delivery person, and experience swift and secure deliveries. Your packages, our priority.</p>
         
        </div>
      </div>
    </div>
        </SwiperSlide>
        
      </Swiper>
    );
};

export default Slider;