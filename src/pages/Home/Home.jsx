import React from 'react';
import Banner from './Banner/Banner';
import Slider from './Slider/Slider';
import FeaturedSection from './FeaturedSection/FeaturedSection';
import TopDeliveryMan from './TopDeliveryMan/TopDeliveryMan';
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';

const Home = () => {
    return (
        <div>
            <TitleHelmet title={"Home"}></TitleHelmet>
            {/* <Banner></Banner> */}
            <Slider></Slider>
            <FeaturedSection></FeaturedSection>
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;