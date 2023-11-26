import React from 'react';
import { Helmet } from 'react-helmet';
// import { GrSwift } from 'react-icons/gr';

const TitleHelmet = ({title}) => {
    return (
        <Helmet>
            <title> SWIFT SHIP || {title} </title>
        </Helmet>
    );
};

export default TitleHelmet;