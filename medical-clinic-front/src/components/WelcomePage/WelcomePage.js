import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import Users from '../../containers/Users/Users';
import ClinicInfo from './ClinicInfo/ClinicInfo';
import './WelcomePageForms.css';

const WelcomePage = () => {

    return (
        <div className='container'>
            <Login />
            <Register />
            <ClinicInfo />
        </div>
    );
};

export default WelcomePage;