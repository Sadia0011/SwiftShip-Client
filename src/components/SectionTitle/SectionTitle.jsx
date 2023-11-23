import React from 'react';

const SectionTitle = ({heading,subheading}) => {
    return (
        <div>
            <h2 className="text-xl">-----{subheading}-----</h2>
            <h2 className="text-4xl">{heading}</h2>
        </div>
    );
};

export default SectionTitle;