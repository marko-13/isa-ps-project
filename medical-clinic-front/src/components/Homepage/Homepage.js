import React from 'react';
import jwt from 'jsonwebtoken';

import Layout from '../../hoc/Layout/Layout';
import UserInfo from './UserInfo/UserInfo';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import UserCard from './UserCards/UserCard/UserCard';
import UserCards from './UserCards/UserCards';

import {Route} from 'react-router-dom';
import ShowClinics from '../Clinic/ShowClinics/ShowClinics.js';
import ShowMedicalHistory from '../MedicalHistory/ShowMedicalHistory/ShowMedicalHistory.js';
import Prescriptions from '../../containers/Prescriptions/Prescriptions';
import UserApproval from '../../containers/UserApproval/UserApproval';
import OperationRooms from '../../containers/ClinicAdministrator/OperationRooms/OperationRooms';
import Leaves from '../../containers/ClinicAdministrator/Leaves/Leaves';
import RegisterClinic from '../../containers/RegisterClinic/RegisterClinic';
import ShowAppointments from '../Appointment/ShowAppointments/ShowAppointments.js';
import DiagnosisRegistry from '../../containers/DiagnosisRegistry/DiagnosisRegistry';
import DrugsRegistry from '../../containers/DrugsRegistry/DrugsRegistry';
import RegisterClinicAdministrator from '../../containers/RegisterClinicAdministrator/RegisterClinicAdministrator'
import RegisterAdminClinicalCenter from '../../containers/RegisterAdminClinicalCenter/RegisterAdminClinicalCenter'
import ShowMedicalStaff from '../MedicalStaff/ShowMedicalStaff/ShowMedicalStaff.js';
import Doctors from '../../containers/ClinicAdministrator/Doctors/Doctors';
import Clinic from '../../containers/ClinicAdministrator/Clinic/Clinic';
import UserPasswordChangeForm from '../../containers/MyProfile/UserPasswordChangeForm/UserPasswordChangeForm';



const Homepage = (props) => {

    let role = null;
    let name = null;
    let lastname = null;
    let passChanged = null;
    let page = null;
    let functions = null;

    if(localStorage.getItem('token') !== null){
        const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);
        passChanged = decodedToken.passChanged;
        role = decodedToken.role.toLowerCase();
        name = decodedToken.name;
        lastname = decodedToken.lastname;

        if (passChanged) {
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
                        <Route path='/homepage/patient/medicalstaff' component={ShowMedicalStaff}></Route>
                        <Route path='/homepage/patient/medicalhistory' component={ShowMedicalHistory}></Route>
                        <Route path='/homepage/patient/appointments' component={ShowAppointments}></Route>
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
                    page = (
                        <Auxiliary>
                            <UserInfo name={name} lastname={lastname} role={role} />
                            <UserCards>
                                <UserCard buttonText={"Operation Rooms"} cardText={"Search and filter operation rooms"}  link ={'/homepage/admin-clinic/operation-rooms'}/>
                                <UserCard buttonText={"Show"} cardText={"Show all requests for leave of absence"}  link ={'/homepage/admin-clinic/leaves'}/>
                                <UserCard buttonText={"Show doctors"} cardText={"Search, add or remove doctors"}  link ={'/homepage/admin-clinic/doctors'}/>
                                <UserCard buttonText={"Clinic's profile"} cardText={"Show and modify clinic's profile"}  link ={'/homepage/admin-clinic/clinic'}/>
                            </UserCards>
                        </Auxiliary>

                    );

                    functions = (
                        <Auxiliary>
                          <Route path='/homepage/admin-clinic/operation-rooms' component={OperationRooms}></Route>
                          <Route path='/homepage/admin-clinic/leaves' component={Leaves}></Route>
                          <Route path='/homepage/admin-clinic/doctors' component={Doctors}></Route>
                          <Route path='/homepage/admin-clinic/clinic' component={Clinic}></Route>
                        </Auxiliary>
                      );

                    break;
                case 'adminclinicalcenter':
                    page = (
                        <Auxiliary>
                            <UserInfo name={name} lastname={lastname} role={role} />
                            <UserCards>
                                <UserCard buttonText={"Approve users"} cardText={"Shows all unapproved users"} link = {'/homepage/admin-clinic-center/user-approval'}/>
                                <UserCard buttonText={"Register clinic"} cardText={"Register new clinic"} link = {'/homepage/admin-clinic-center/register-clinic'}/>
                                <UserCard buttonText={"Diagnosis registry"} cardText={"Add new diagnosis"} link = {'/homepage/admin-clinic-center/diagnosis-registry'}/>
                                <UserCard buttonText={"Drugs registry"} cardText={"Add new drug"} link = {'/homepage/admin-clinic-center/drugs-registry'}/>
                                <UserCard buttonText={"Register clinic's administrator"} cardText={"Register new clinic's administrator"} link = {'/homepage/admin-clinic-center/register-clinic-administrator'}/>
                                <UserCard buttonText={"Register admin of clinical center"} cardText={"Register new admin of clinical center"} link = {'/homepage/admin-clinic-center/register-admin-clinical-center'}/>
                            </UserCards>
                        </Auxiliary>
                    );
                    functions = (
                      <Auxiliary>
                        <Route path='/homepage/admin-clinic-center/user-approval' component={UserApproval}></Route>
                        <Route path='/homepage/admin-clinic-center/register-clinic' component={RegisterClinic}></Route>
                        <Route path='/homepage/admin-clinic-center/diagnosis-registry' component={DiagnosisRegistry}></Route>
                        <Route path='/homepage/admin-clinic-center/drugs-registry' component={DrugsRegistry}></Route>
                        <Route path='/homepage/admin-clinic-center/register-clinic-administrator' component={RegisterClinicAdministrator}></Route>
                        <Route path='/homepage/admin-clinic-center/register-admin-clinical-center' component={RegisterAdminClinicalCenter}></Route>
                      </Auxiliary>
                    );
                    break;
                default:
                    page = <h1>Nije logovan!</h1>
                    break;
            }
        } else {
            page = (
                    <UserPasswordChangeForm/>
                );
        }
    } else {
        page = (
            <div>
                <h1>Unauthorized!</h1>
                <a href = "/">Go back</a>
            </div>
            );
    }

    return (
            <Layout>
                <div className={'container'}>
                    <div className='row' style={{ margin: '0px 5px' }}>
                        {page}
                    </div>

                    <div className='row' style={{ margin: '0 5px', marginTop: '30px' }}>

                      {functions}
                    </div>
                </div>
            </Layout>
    );
};

export default Homepage;
