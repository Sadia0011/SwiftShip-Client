import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const About = () => {
    return (
        <div>
            <SectionTitle heading={"About us"} subheading={"Some information"}></SectionTitle>
       
            <div className="text-lg space-y-5">
      
      <p>
      Welcome to SwiftShip – Your Trusted Delivery Partner! 

At SwiftShip, we understand the importance of seamless and reliable delivery services. Our mission is to simplify and enhance the delivery experience for individuals and businesses alike. Whether you're sending parcels across town or receiving packages from around the world, SwiftShip is here to make it swift and hassle-free.
      </p>
 

 <h2 className='text-2xl font-semibold'>Our Story :</h2>
      <p className="my-5">
      SwiftShip started with a simple idea – to revolutionize the delivery industry and make it more accessible to everyone. What began as a small team passionate about logistics has grown into a trusted delivery partner serving communities far and wide.
      </p>
     
    </div>
        </div>
    );
};

export default About;