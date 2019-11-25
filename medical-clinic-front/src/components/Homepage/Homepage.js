import React from 'react';
import jwt from 'jsonwebtoken';

import HomepageNurse from '../../containers/HomepageNurse/HomepageNurse';
import Layout from '../../hoc/Layout/Layout';
import UserInfo from './UserInfo/UserInfo';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import UserCard from './UserCards/UserCard/UserCard';
import UserCards from './UserCards/UserCards';

const Homepage = () => {

    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const role = decodedToken.role.toLowerCase();
    const name = decodedToken.name;
    const lastname = decodedToken.lastname;

    let page = null;


    switch (role) {
        case 'nurse':
            page = <HomepageNurse name={name} lastname={lastname} role={role} />
            break;
        case 'patient':
            page = <h1>Pacijent</h1>
            break;
        case 'doctor':
            page = (
                <Auxiliary>
                    <UserInfo />
                    <UserCards>
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                    </UserCards>
                </Auxiliary>

            );
            break;
        case 'adminclinic':
            page = <h1>Admin clinic</h1>
            break;
        case 'adminclinicalcenter':
            page = <h1>Admin clinic center</h1>
            break;
        default:
            page = <h1>Nije logovan!</h1>
            break;
    }

    return (
        <Layout>
            <div className={'container'}>
                <div className='row' style={{ margin: '0 5px' }}>
                    {page}
                </div>
            </div>
        </Layout>
    );
};

export default Homepage;