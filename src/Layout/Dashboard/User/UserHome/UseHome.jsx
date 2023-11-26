import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';


const UseHome = () => {
    const {user}=useAuth()
    return (
        <div>
            <SectionTitle subheading={"Hi Welcome"} heading={user?.displayName ? user.displayName : "Back"}></SectionTitle>
        </div>
    );
};

export default UseHome;