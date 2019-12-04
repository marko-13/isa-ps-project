import React from 'react';
import jwt from 'jsonwebtoken';

import Layout from '../../hoc/Layout/Layout';
import UserInfo from './UserInfo/UserInfo';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import UserCard from './UserCards/UserCard/UserCard';
import UserCards from './UserCards/UserCards';

import {Route} from 'react-router-dom';
import ShowClinics from '../Clinic/ShowClinics/ShowClinics.js'
import ShowMedicalHistory from '../MedicalHistory/ShowMedicalHistory/ShowMedicalHistory.js'
import Prescriptions from '../../containers/Prescriptions/Prescriptions'
import UserApproval from '../../containers/UserApproval/UserApproval'


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

    let functions = null;


    switch (role) {
        case 'nurse':
            page = (
                <Auxiliary>
                    <UserInfo name={name} lastname={lastname} role={role} />
                    <UserCards>
                        <UserCard buttonText={"Work schedule"} cardText={"Shows work schedule"} link = {'/homepage/workschedule'}/>
                        <UserCard buttonText={"Validate perscriptions"} cardText={"Shows a list of perscriptions that need to be validated"}  link ={'/homepage/nurse/prescriptions'}/>
                        <UserCard buttonText={"List of patients"} cardText={"Shows a list of patients"}  link ={'/homepage/patient/clinics'}/>
                        <UserCard buttonText={"Ask for leave of absence"} cardText={"Shows form for leave of absence"}  link ={'/homepage/patient/clinics'}/>
                    </UserCards>
                </Auxiliary>
            );
            functions = (
              <Auxiliary>
                <Route path='/homepage/nurse/prescriptions' component={Prescriptions}></Route>
                <Route path='/homepage/patient/medicalstaff' render={null}></Route>
                <Route path='/homepage/patient/medicalhistory' component={ShowMedicalHistory}></Route>
                <Route path='/homepage/patient/appointments' render={null}></Route>
              </Auxiliary>
            );
            break;
        case 'patient':
            page = (
                <Auxiliary>
                    <UserInfo name={name} lastname={lastname} role={role} />
                    <UserCards>
                        <UserCard buttonText={"Inspect clinics"} cardText={"Shows a list of all existing clinics in clinical center"} link ={'/homepage/patient/clinics'}/>
                        <UserCard buttonText={"Inspect medical staff"} cardText={"Shows a list of every medical staff member, nurses and doctors"} link ={'/homepage/patient/medicalstaff'}/>
                        <UserCard buttonText={"Inspect medical history"} cardText={"Shows a list of patients medical history"} link={'/homepage/patient/medicalhistory'}/>
                        <UserCard buttonText={"Inspect appointments"} cardText={"Shows a list of patients upcoming and past appointments"} link={'/homepage/patient/appointments'}/>
                    </UserCards>
                </Auxiliary>

            );
            functions = (
              <Auxiliary>
                <Route path='/homepage/patient/clinics' component={ShowClinics}></Route>
                <Route path='/homepage/patient/medicalstaff' render={null}></Route>
                <Route path='/homepage/patient/medicalhistory' component={ShowMedicalHistory}></Route>
                <Route path='/homepage/patient/appointments' render={null}></Route>
              </Auxiliary>
            );
            break;
        case 'doctor':
            page = (
                <Auxiliary>
                    <UserInfo name={name} lastname={lastname} role={role} />
                    <UserCards>
                        <UserCard buttonText={"List of patients"} cardText={"Shows a list of patients"}  link ={'/homepage/patient/clinics'}/>
                        <UserCard buttonText={"Start exam"} cardText={"Starta a new medical exam"} link ={'/homepage/patient/clinics'} />
                        <UserCard buttonText={"Work schedule"} cardText={"Shows my work schedule"}  link ={'/homepage/patient/clinics'}/>
                        <UserCard buttonText={"Ask for leave of absence"} cardText={"Shows form for leave of absence"}  link ={'/homepage/patient/clinics'}/>
                        <UserCard buttonText={"Schedule"} cardText={"Schedule an appointment for operation or medical exam"}  link ={'/homepage/patient/clinics'}/>
                    </UserCards>
                </Auxiliary>

            );
            break;
        case 'adminclinic':
            page = <h1>Admin clinic</h1>
            break;
        case 'adminclinicalcenter':
            page = (
                <Auxiliary>
                    <UserInfo name={name} lastname={lastname} role={role} />
                    <UserCards>
                        <UserCard buttonText={"Approve users"} cardText={"Shows all unapproved users"} link = {'/homepage/admin-clinic-center/user-approval'}/>
                    </UserCards>
                </Auxiliary>
            );
            functions = (
              <Auxiliary>
                <Route path='/homepage/admin-clinic-center/user-approval' component={UserApproval}></Route>
              </Auxiliary>
            );
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

                    <div className='row' style={{ margin: '0 5px' }}>
                      {functions}
                    </div>
                </div>
            </Layout>
    );
};

export default Homepage;
