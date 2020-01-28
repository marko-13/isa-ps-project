import React, { Component } from 'react';
import jwt from 'jsonwebtoken';

import axios from '../../../../axios';

class MedicalHistory extends Component {

    state = {
        medicalHistory: null,
        hasAuthority: false,
    }

    componentDidMount() {

        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const userId = decodedToken.userId;
            const userRole = decodedToken.role;

            //PROSLEDI PATIENT ID IZ URL-A
            const query = new URLSearchParams(this.props.location.search);
            let patientId;
            for (let param of query.entries()) {
                patientId = param[1];
            }

            axios.get("/medicalHistory/getMedicalHistoryFromPatient/" + patientId)
                .then(res => {

                    //PROVERI DA LI SE ID ULOGOVANOG MATCHUJE SA ID OD NURSE/DOKTORA IZ PREGLEDA
                    //AKO DA, DAJ MU PRISTUP KARTONU AKO NE NE DAJ

                    if (res.data.appointments.length !== 0 || res.data.diagnosis.length !== 0) {
                        if (userRole === "DOCTOR") {
                            res.data.appointments.forEach(app => {
                                if (app.doctors === null) {
                                    this.setState({ hasAuthority: false });
                                } else {
                                    app.doctors.forEach(doc => {
                                        if (doc === userId) {
                                            this.setState({ hasAuthority: true });
                                        }
                                    })
                                }
                            });
                        } else if (userRole === "NURSE") {

                            res.data.appointments.forEach(app => {
                                if (app.nurse === userId) {
                                    this.setState({ hasAuthority: true });
                                }
                            });

                        } else {
                            this.setState({ hasAuthority: false });
                        }
                    }

                    this.setState({ medicalHistory: res.data })
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        let content = null;

        if (this.state.medicalHistory !== null) {
            if (!this.state.hasAuthority) {
                content = <h2>UNABLE TO ACCES PATIENTS MEDICAL HISTORY</h2>;
            } else {
                content = <h1>MEDICAL HISTORY</h1>;
            }

        } else {
            content = <h2>Loading...</h2>
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default MedicalHistory;