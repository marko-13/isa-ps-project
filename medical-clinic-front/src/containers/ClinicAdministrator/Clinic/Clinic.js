import React, { Component } from 'react';

import ClinicInfo from '../../../components/Clinic/ClinicInfo/ClinicInfo';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import DoctorsReview from '../../../components/Tables/DoctorsReview/DoctorsReview';
import ClinicAppointmentsReview from '../../../components/Clinic/ClinicAppointmentsReview/ClinicAppointmentsReview';

class Clinic extends Component {
    render() {
        return (
            <Auxiliary>
                <div className='col-12'>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link text-dark active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Clinic information</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Doctor reviews</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Appointments information</a>
                        </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">

                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <br></br>
                            <div className='row'>
                                <div className='col-6'>
                                    <ClinicInfo />
                                </div>
                                <div className='col-6'>
                                    <h1>MAPA</h1>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <br></br>
                            <div className='row'>
                                <div
                                    className='col-7 login-form-1'
                                    style={{ margin: 'auto' }}>
                                    <DoctorsReview />
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <br></br>
                            <div className="row">
                                <div
                                    className="col-8 login-form-1"
                                    style={{ margin: 'auto' }}>
                                        <ClinicAppointmentsReview />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </Auxiliary>
        );
    }
}

export default Clinic;