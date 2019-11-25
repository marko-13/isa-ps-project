import React from 'react';
import jwt from 'jsonwebtoken';

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
            page = (
                <Auxiliary>
                <UserInfo name={name} lastname={lastname} role={role}/>
                <UserCards>
                    <UserCard but={"Work schedule"} tx={"Shows work schedule"}/>
                    <UserCard but={"Validate perscriptions"} tx={"Shows a list of perscriptions that need to be validated"}/>
                    <UserCard but={"List of patients"} tx={"Shows a list of patients"}/>
                    <UserCard but={"Ask for leave of absence"} tx={"Shows form for leave of absence"}/>
                </UserCards>
            </Auxiliary>
            );
            break;
        case 'patient':
            page = (
              <Auxiliary>
                <UserInfo name={name} lastname={lastname} role={role}/>
                <UserCards>
                    <UserCard but={"Inspect clinics"} tx={"Shows a list of all existing clinics in clinical center"}/>
                    <UserCard but={"Inspect medical staff"} tx={"Shows a list of every medical staff member, nurses and doctors"}/>
                    <UserCard but={"Inspect medical history"} tx={"Shows a list of patients medical history"}/>
                    <UserCard but={"Inspect appointments"} tx={"Shows a list of patients upcoming and past appointments"}/>
                </UserCards>
            </Auxiliary>

            );
            break;
        case 'doctor':
            page = (
                <Auxiliary>
                    <UserInfo name={name} lastname={lastname} role={role}/>
                    <UserCards>
                        <UserCard but={"NEKA FUN"} tx={"NEKI OPIS"}/>
                        <UserCard but={"NEKA FUN"} tx={"NEKI OPIS"}/>
                        <UserCard but={"NEKA FUN"} tx={"NEKI OPIS"}/>
                        <UserCard but={"NEKA FUN"} tx={"NEKI OPIS"}/>
                        <UserCard but={"NEKA FUN"} tx={"NEKI OPIS"}/>
                        <UserCard but={"NEKA FUN"} tx={"NEKI OPIS"}/>
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
