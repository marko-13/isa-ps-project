import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import ClinicInfo from './ClinicInfo/ClinicInfo';
import './WelcomePageForms.css';
import LogoBar from '../../components/Navigation/LogoBar/LogoBar';

const WelcomePage = () => {

    return (
        <Auxiliary>
        <LogoBar/>
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Register /> 
                </div>
                <div className='col'>
                    <ClinicInfo />
                    <Login />  
                </div>
            </div>
        </div>
        </Auxiliary>
    );
};

export default WelcomePage;