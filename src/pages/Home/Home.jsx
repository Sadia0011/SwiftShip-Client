import React from 'react';
import Banner from './Banner/Banner';
import Slider from './Slider/Slider';
import FeaturedSection from './FeaturedSection/FeaturedSection';

const Home = () => {
    return (
        <div>
            {/* <Banner></Banner> */}
            <Slider></Slider>
            <FeaturedSection></FeaturedSection>
        </div>
    );
};

export default Home;