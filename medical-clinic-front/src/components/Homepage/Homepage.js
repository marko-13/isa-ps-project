import React from 'react';
import jwt from 'jsonwebtoken';

import Layout from '../../hoc/Layout/Layout';
import UserInfo from './UserInfo/UserInfo';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import UserCard from './UserCards/UserCard/UserCard';
import UserCards from './UserCards/UserCards';

import { Route } from 'react-router-dom';
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
import RegisterClinicAdministrator from '../../containers/RegisterClinicAdministrator/RegisterClinicAdministrator';
import RegisterAdminClinicalCenter from '../../containers/RegisterAdminClinicalCenter/RegisterAdminClinicalCenter';
import WorkSchedule from '../../containers/WorkSchedule/WorkSchedule';
import ShowMedicalStaff from '../MedicalStaff/ShowMedicalStaff/ShowMedicalStaff.js';
import Doctors from '../../containers/ClinicAdministrator/Doctors/Doctors';
import Clinic from '../../containers/ClinicAdministrator/Clinic/Clinic';
import UserPasswordChangeForm from '../../containers/MyProfile/UserPasswordChangeForm/UserPasswordChangeForm';
import Examinations from '../../containers/ClinicAdministrator/Examinations/Examinations';
import Patients from '../../containers/MedicalStaff/Patients/Patients';
import Requests from '../../containers/ClinicAdministrator/Requests/Requests';
import ReviewClinic from '../../components/Clinic/ReviewClinic/ReviewClinic';
import ReviewDoctor from '../../components/Doctor/ReviewDoctor/ReviewDoctor';
import StartExam from '../../containers/MedicalStaff/Doctors/StartExam/StartExam';
import ChooseAvailableDoctorsForm from '../../components/Forms/ChooseAvailableDoctorsForm/ChooseAvailableDoctorsForm';
import FastExam from '../../containers/ClinicAdministrator/FastExam/FastExam';

const Homepage = (props) => {

    let role = null;
    let name = null;
    let lastname = null;
    let passChanged = null;
    let page = null;
    let functions = null;

    if (localStorage.getItem('token') !== null) {
        const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);
        passChanged = decodedToken.passChanged;
        role = decodedToken.role.toLowerCase();
        name = decodedToken.name;
        lastname = decodedToken.lastname;

        //pacijent ne mora da menja sifru pri prvom prijavljivanju na sistem
        if(role === 'patient'){
          passChanged = true;
        }

        if (passChanged) {
            switch (role) {
                case 'nurse':
                    page = (
                        <Auxiliary>
                            <UserInfo name={name} lastname={lastname} role={role} />
                            <UserCards>
                                <UserCard buttonText={"Work schedule"} cardText={"Shows work schedule"} link = {'/homepage/nurse/workschedule'}/>
                                <UserCard buttonText={"Validate perscriptions"} cardText={"Shows a list of perscriptions that need to be validated"}  link ={'/homepage/nurse/prescriptions'}/>
                                <UserCard buttonText={"List of patients"} cardText={"Shows a list of patients"} link={'/homepage/nurse/patients'} />
                                <UserCard buttonText={"Ask for leave of absence"} cardText={"Shows form for leave of absence"}  link ={'/homepage/patient/clinics'}/>
                            </UserCards>
                        </Auxiliary>
                    );
                    functions = (
                      <Auxiliary>
                        <Route path='/homepage/nurse/workschedule' component={WorkSchedule}></Route>
                        <Route path='/homepage/nurse/prescriptions' component={Prescriptions}></Route>
                        <Route path='/homepage/nurse/patients' component={Patients}></Route>
                        <Route path='/homepage/patient/clinics' component={null}></Route>
                        <Route path='/homepage/start-exam' component={StartExam} />
                      </Auxiliary>
                    );
                    break;
                case 'patient':
                    page = (
                        <Auxiliary>
                            <UserInfo name={name} lastname={lastname} role={role} />
                            <UserCards>
                                <UserCard buttonText={"Inspect clinics"} cardText={"Shows a list of all existing clinics in clinical center"} link={'/homepage/patient/clinics'} />
                                <UserCard buttonText={"Inspect medical staff"} cardText={"Shows a list of every medical staff member, nurses and doctors"} link={'/homepage/patient/medicalstaff'} />
                                <UserCard buttonText={"Inspect medical history"} cardText={"Shows a list of patients medical history"} link={'/homepage/patient/medicalhistory'} />
                                <UserCard buttonText={"Inspect appointments"} cardText={"Shows a list of patients upcoming and past appointments"} link={'/homepage/patient/appointments'} />
                                <UserCard buttonText={"Review doctors"} cardText={"Shows all doctors you have associated with and provides an option to rate them"} link={'/homepage/patient/review_doctors'} />
                                <UserCard buttonText={"Review clinic"} cardText={"Shows all clinics you have previously visited and provides an option to rate them"} link={'/homepage/patient/review_clinics'} />
                            </UserCards>
                        </Auxiliary>

                    );
                    functions = (
                        <Auxiliary>
                            <Route path='/homepage/patient/clinics' component={ShowClinics}></Route>
                            <Route path='/homepage/patient/medicalstaff' component={ShowMedicalStaff}></Route>
                            <Route path='/homepage/patient/medicalhistory' component={ShowMedicalHistory}></Route>
                            <Route path='/homepage/patient/appointments' component={ShowAppointments}></Route>
                            <Route path='/homepage/patient/review_doctors' component={ReviewDoctor}></Route>
                            <Route path='/homepage/patient/review_clinics' component={ReviewClinic}></Route>
                        </Auxiliary>
                    );
                    break;
                case 'doctor':
                    page = (
                        <Auxiliary>
                            <UserInfo name={name} lastname={lastname} role={role} />
                            <UserCards>
                                <UserCard buttonText={"Schedule appointment"} cardText={"Schedule an appointment for operation or medical exam"}  link ={'/homepage/doctor/workschedule'}/>
                                 <UserCard buttonText={"List of patients"} cardText={"Shows a list of patients"} link={'/homepage/doctor/patients'} />
                                {/*<UserCard buttonText={"Start exam"} cardText={"Start a new medical exam"} link ={'/homepage/start-exam'} />*/}
                                <UserCard buttonText={"Work schedule"} cardText={"Shows my work schedule"}  link ={'/homepage/doctor/workschedule'}/>
                                <UserCard buttonText={"Ask for leave of absence"} cardText={"Shows form for leave of absence"}  link ={'/homepage/patient/clinics'}/>
                            </UserCards>
                        </Auxiliary>

                    );
                    functions = (
                      <Auxiliary>
                        <Route path='/homepage/doctor/workschedule' component={WorkSchedule}></Route>
                        <Route path='/homepage/doctor/patients' component={Patients} />
                        <Route path='/homepage/start-exam' component={StartExam} />
                      </Auxiliary>
                    );
                    break;
                case 'adminclinic':
                    page = (
                        <Auxiliary>
                            <UserInfo name={name} lastname={lastname} role={role} />
                            <UserCards>
                                <UserCard buttonText={"Operation Rooms"} cardText={"Search and filter operation rooms"} link={'/homepage/admin-clinic/operation-rooms'} />
                                <UserCard buttonText={"Show"} cardText={"Show all requests for leave of absence"} link={'/homepage/admin-clinic/leaves'} />
                                <UserCard buttonText={"Show doctors"} cardText={"Search, add or remove doctors"} link={'/homepage/admin-clinic/doctors'} />
                                <UserCard buttonText={"Clinic's profile"} cardText={"Show and modify clinic's profile"} link={'/homepage/admin-clinic/clinic'} />
                                <UserCard buttonText={"Show services"} cardText={"Search, add modify or add new medical services"} link={'/homepage/admin-clinic/services'} />
                                <UserCard buttonText={"Show requests"} cardText={"Show requests for all appointments"} link={'/homepage/admin-clinic/requests'} />
                                <UserCard buttonText={"Create"} cardText={"Create new fast medical examination"} link={'/homepage/admin-clinic/new-exam'} />
                            </UserCards>
                        </Auxiliary>

                    );

                    functions = (
                        <Auxiliary>
                            <Route path='/homepage/admin-clinic/operation-rooms' component={OperationRooms}></Route>
                            <Route path='/homepage/admin-clinic/leaves' component={Leaves}></Route>
                            <Route path='/homepage/admin-clinic/doctors' component={Doctors}></Route>
                            <Route path='/homepage/admin-clinic/clinic' component={Clinic}></Route>
                            <Route path='/homepage/admin-clinic/services' component={Examinations}></Route>
                            <Route path='/homepage/admin-clinic/requests' component={Requests}></Route>
                            <Route path='/homepage/admin-clinic/new-exam' component={FastExam}></Route>
                        </Auxiliary>
                    );

                    break;
                case 'adminclinicalcenter':
                    page = (
                        <Auxiliary>
                            <UserInfo name={name} lastname={lastname} role={role} />
                            <UserCards>
                                <UserCard buttonText={"Approve users"} cardText={"Shows all unapproved users"} link={'/homepage/admin-clinic-center/user-approval'} />
                                <UserCard buttonText={"Register clinic"} cardText={"Register new clinic"} link={'/homepage/admin-clinic-center/register-clinic'} />
                                <UserCard buttonText={"Diagnosis registry"} cardText={"Add new diagnosis"} link={'/homepage/admin-clinic-center/diagnosis-registry'} />
                                <UserCard buttonText={"Drugs registry"} cardText={"Add new drug"} link={'/homepage/admin-clinic-center/drugs-registry'} />
                                <UserCard buttonText={"Register clinic's administrator"} cardText={"Register new clinic's administrator"} link={'/homepage/admin-clinic-center/register-clinic-administrator'} />
                                <UserCard buttonText={"Register admin of clinical center"} cardText={"Register new admin of clinical center"} link={'/homepage/admin-clinic-center/register-admin-clinical-center'} />
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
                <UserPasswordChangeForm />
            );
        }
    } else {
        page = (
            <div>
                <h1>Unauthorized!</h1>
                <a href="/">Go back</a>
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
