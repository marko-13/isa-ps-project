import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';

const WelcomePage = () => {
    return (
        <Auxiliary>
            <Login />
            <Register />
        </Auxiliary>
    );
};

export default WelcomePage;