import React from 'react';

const SectionTitle = ({heading,subheading}) => {
    return (
        <div className='max-w-lg mx-auto uppercase text-center italic'>
            <div className='divider'></div>
            <h2 className="text-lg text-blue-800">{subheading}</h2>
            <h2 className="text-3xl font-semibold">{heading}</h2>
            <div className='divider'></div>
        </div>
    );
};

export default SectionTitle;