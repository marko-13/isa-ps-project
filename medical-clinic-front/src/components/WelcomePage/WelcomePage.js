import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import Users from '../../containers/Users/Users';

const WelcomePage = () => {

    return (
        <Auxiliary>
            <Login />
            <Register />
            <Users />
        </Auxiliary>
    );
};

export default WelcomePage;