import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../../Hooks/useAuth';

const DeliverymanHome = () => {
    const {user}=useAuth()
    return (
        <div>
            <SectionTitle subheading={"Hi Welcome"} heading={user?.displayName ? user.displayName : "Back"}></SectionTitle>
        </div>
    );
};

export default DeliverymanHome;