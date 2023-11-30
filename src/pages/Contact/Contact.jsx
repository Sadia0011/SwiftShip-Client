import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Contact = () => {
    return (
        <div>
            <SectionTitle heading={"Contact us"} subheading={"Have any Questions?please"}></SectionTitle>
        
        
            <div className="my-5 space-y-5">
      
      <p>
      Have questions, suggestions, or just want to say hello? We'd love to hear from you! Feel free to reach out through any of the following channels:
      </p>

     <h2 className="text-xl font-semibold ">Contact Information</h2>
     <h2 className="text-xl font-semibold">Email: <span className='text-base font-normal'>contact@example.com</span></h2>
     <h2 className="text-xl font-semibold">Phone: <span className='text-base font-normal'>+1 (555) 123-4567</span></h2>

    </div>
        
        </div>
    );
};

export default Contact;