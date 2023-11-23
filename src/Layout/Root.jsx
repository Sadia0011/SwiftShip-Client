import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import Container from '../components/Container/Container';

const Root = () => {
    return (
        <div className='font-fontKanit flex flex-col min-h-screen'>
            <Navbar></Navbar>
           <div>
            <Container>
            <Outlet></Outlet>
            </Container>
           </div>
            <div className='mt-auto'>
            <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;