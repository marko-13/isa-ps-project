import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import axios from '../../../../axios';
import classes from './MedicalHistory.module.css';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';

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
        console.log(this.state.medicalHistory);
        let content = null;

        if (this.state.medicalHistory !== null) {
            if (!this.state.hasAuthority) {
                content = <h2>UNABLE TO ACCES PATIENTS MEDICAL HISTORY</h2>;
            } else {
                content = (
                    <Auxiliary>
                        <div className={classes.Header}>
                            <h3>Medical history</h3>
                        </div>
                        <div className={classes.Medicalhistory}>
                            <div className={classes.Patientinfo}>
                                <h5>Weight: {this.state.medicalHistory.weight} kg</h5>
                                <h5>Height: {this.state.medicalHistory.height} cm</h5>
                                <h5>Dioptre: {this.state.medicalHistory.dioptre} kg</h5>
                                <h5>Allergies: {this.state.medicalHistory.allergies}</h5>
                            </div>
                            <div className={classes.Appointment}>
                                <h5>Appointments </h5>
                                <div className={classes.Appointments}>
                                    {this.state.medicalHistory.appointments.map((app, i) => {
                                        return (
                                            <p key={i}><strong>{i + 1}. </strong><strong>DATE: </strong>{moment(app.date).format("DD-MMM-YYYY hh:mm")}, <strong>DURATION:</strong> {app.duration}min, <strong>TYPE:</strong> {app.fastExam}</p>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={classes.Appointment}>
                                <h5>Diagnosis </h5>
                                <div className={classes.Appointments}>
                                    {this.state.medicalHistory.diagnosis.map((app, i) => {
                                        return (
                                            <p key={i}><strong>{i + 1}. </strong><strong>DIAGNOSIS NAME: </strong>{app.diagnosisName}</p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </Auxiliary>
                );
            }

        } else {
            content = <h2>Loading...</h2>
        }

        return (
            <div className={classes.Content}>
                {content}
            </div>
        );
    }
}

export default MedicalHistory;