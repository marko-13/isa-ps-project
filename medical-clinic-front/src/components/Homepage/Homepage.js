import React from 'react';
import jwt from 'jsonwebtoken';

import Layout from '../../hoc/Layout/Layout';
import UserInfo from './UserInfo/UserInfo';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import UserCard from './UserCards/UserCard/UserCard';
import UserCards from './UserCards/UserCards';

const Homepage = (props) => {

    let role = null;
    let name = null;
    let lastname = null;

    if(localStorage.getItem('token') !== null){
        const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);
        role = decodedToken.role.toLowerCase();
        name = decodedToken.name;
        lastname = decodedToken.lastname;
    }
    
    

    let page = null;


    switch (role) {
        case 'nurse':
            page = (
                <Auxiliary>
                    <UserInfo name={name} lastname={lastname} role={role} />
                    <UserCards>
                        <UserCard buttonText={"Work schedule"} cardText={"Shows work schedule"} />
                        <UserCard buttonText={"Validate perscriptions"} cardText={"Shows a list of perscriptions that need to be validated"} />
                        <UserCard buttonText={"List of patients"} cardText={"Shows a list of patients"} />
                        <UserCard buttonText={"Ask for leave of absence"} cardText={"Shows form for leave of absence"} />
                    </UserCards>
                </Auxiliary>
            );
            break;
        case 'patient':
            page = (
                <Auxiliary>
                    <UserInfo name={name} lastname={lastname} role={role} />
                    <UserCards>
                        <UserCard buttonText={"Inspect clinics"} cardText={"Shows a list of all existing clinics in clinical center"} />
                        <UserCard buttonText={"Inspect medical staff"} cardText={"Shows a list of every medical staff member, nurses and doctors"} />
                        <UserCard buttonText={"Inspect medical history"} cardText={"Shows a list of patients medical history"} />
                        <UserCard buttonText={"Inspect appointments"} cardText={"Shows a list of patients upcoming and past appointments"} />
                    </UserCards>
                </Auxiliary>

            );
            break;
        case 'doctor':
            page = (
                <Auxiliary>
                    <UserInfo name={name} lastname={lastname} role={role} />
                    <UserCards>
                        <UserCard buttonText={"List of patients"} cardText={"Shows a list of patients"} />
                        <UserCard buttonText={"Start exam"} cardText={"Starta a new medical exam"} />
                        <UserCard buttonText={"Work schedule"} cardText={"Shows my work schedule"} />
                        <UserCard buttonText={"Ask for leave of absence"} cardText={"Shows form for leave of absence"} />
                        <UserCard buttonText={"Schedule"} cardText={"Schedule an appointment for operation or medical exam"} />
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

    //<Route path={this.props.match.path + '/contact-data'}

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
