import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import axios from '../../../../axios';
import classes from './MedicalHistory.module.css';
import './MedicalHistory.css';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Button from '../../../../components/UI/Button/Button';
import Modal from '../../../../components/UI/Modal/Modal';
import successimg from '../../../../assets/images/success.png';
import crossimg from '../../../../assets/images/cross.png';
import MedicalReport from '../MedicalReport/MedicalReport';

class MedicalHistory extends Component {

    state = {
        medicalHistory: null,
        hasAuthority: false,
        seeMedicalReport: [],
        addMedicalReport: [],
        isModalOpen: false,
        medicalReport: null
    }

    componentDidMount() {

        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const userId = decodedToken.userId;
            const userRole = decodedToken.role;

            console.log('U medical history');
            console.log(this.props.query);
            //PROSLEDI PATIENT ID IZ URL-A
            const query = new URLSearchParams(this.props.query);
            let patientId;
            for (let param of query.entries()) {
                patientId = param[1];
            }

            this.setState({medicalHistory: null,
                            hasAuthority: false,
                            seeMedicalReport: [],
                            addMedicalReport: []});

            axios.get("/medicalHistory/getMedicalHistoryFromPatient/" + patientId)
                .then(res => {

                    //PROVERI DA LI SE ID ULOGOVANOG MATCHUJE SA ID OD NURSE/DOKTORA IZ PREGLEDA
                    //AKO DA, DAJ MU PRISTUP KARTONU AKO NE NE DAJ
                    console.log(res);
                    if (res.data.appointments.length !== 0) {
                        this.setState({hasAuthority: true});
                    }

                    this.setState({ medicalHistory: res.data });
                    this.setMedicalReportTables();
                })
                .catch(err => {
                    this.setState({medicalHistory: []});
                    console.log(err);
                });
        }
    }

    closeModal = () => {
        this.setState({isModalOpen : false});
    }

    onCloseHandler = (event) => {
        event.preventDefault();
        this.closeModal();
    }

    setMedicalReportTables() {
        let seeMedicalReportVar = [];
        let addMedicalReportVar = [];
        if(this.state.medicalHistory !== null) {
            console.log("ona funkcija");
            console.log(this.state.medicalHistory.appointments[0]);
            if (this.state.medicalHistory.appointments[0] !== undefined) {
                for (var i = 0; i < this.state.medicalHistory.appointments.length; i++) {
                    if (this.state.medicalHistory.appointments[i].medicalReport !== null && this.state.medicalHistory.appointments[i].assigned && this.state.medicalHistory.appointments[i].type !== "OP" && this.state.medicalHistory.appointments[i].held) {
                        seeMedicalReportVar.push(this.state.medicalHistory.appointments[i]);
                    } else if (this.state.medicalHistory.appointments[i].assigned && this.state.medicalHistory.appointments[i].type !== "OP" && this.state.medicalHistory.appointments[i].held) {
                        addMedicalReportVar.push(this.state.medicalHistory.appointments[i]);
                    }
                }

                this.setState({seeMedicalReport: seeMedicalReportVar,
                                addMedicalReport: addMedicalReportVar})

                console.log("Varovi");
                console.log(seeMedicalReportVar);
                console.log(addMedicalReportVar);

                console.log("Stateovi");
                console.log(this.state.seeMedicalReport);
                console.log(this.state.addMedicalReport);
            } else {
                this.setState({medicalHistory: {
                    appointments: []},
                    seeMedicalReport: seeMedicalReportVar,
                    addMedicalReport: addMedicalReportVar});
            }
        }
    }

    render() {
        console.log("MILAN");
        console.log(this.state.medicalHistory);
        let content = null;

        if (this.state.medicalHistory !== null) {
            if (!this.state.hasAuthority) {
                content = (
                    <Auxiliary>
                    <h2>UNABLE TO ACCESS PATIENTS MEDICAL HISTORY</h2>
                    <div className="row" style={{textAlign: 'left', paddingLeft: '15px', float: 'left'}}>
                        <div style={{fontSize: '1.25em'}}>
                            <Button type = 'black' click = {this.props.back}>Back</Button>
                        </div>
                    </div>
                    </Auxiliary>
                );
            } else {
                const columns = [{
                    Header: 'All appointments',
                    columns: [
                    {
                        id: 'appType',
                        Header: 'Type',
                        accessor: d => d.type},
                    {
                        id: 'appDate',
                        Header: 'Date',
                        accessor: d => moment(d.date).format("DD-MMM-YYYY hh:mm")},
                    {
                        id: 'appDuration',
                        Header: 'Duration',
                        accessor: d => d.duration},
                    {
                        id: 'appFast',
                        Header: 'Fast exam',
                        accessor: d => d.fastExam === 'Regular'? 'No' : 'Yes'},
                    {
                        id: 'appService',
                        Header: 'Service',
                        accessor: d => d.service},
                    {
                        id: 'appRoom',
                        Header: 'Room',
                        accessor: d => d.operationRoom},
                    {
                        id: 'appAssigned',
                        Header: 'My assignments',
                        accessor: d => d.assigned? 'Assigned': ''}
                    ]
                }];

                const columnsSee = [{
                    Header: 'See medical reports',
                    columns: [
                    {
                        id: 'appType',
                        Header: 'Type',
                        accessor: d => d.type},
                    {
                        id: 'appDate',
                        Header: 'Date',
                        accessor: d => moment(d.date).format("DD-MMM-YYYY hh:mm")},
                    {
                        id: 'appDuration',
                        Header: 'Duration',
                        accessor: d => d.duration},
                    {
                        id: 'appFast',
                        Header: 'Fast exam',
                        accessor: d => d.fastExam === 'Regular'? 'No' : 'Yes'},
                    {
                        id: 'appService',
                        Header: 'Service',
                        accessor: d => d.service},
                    {
                        id: 'appRoom',
                        Header: 'Room',
                        accessor: d => d.operationRoom},
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button type="black" click={() => {
                                console.log(original.medicalReport);
                                this.setState({isModalOpen : true});
                                this.setState({medicalReport: original.medicalReport});
                                console.log("Prosledjeno u stanje");
                                console.log(this.state.medicalReport);
                            }
                        }>
                                See report
                            </Button></center>),
                        filterable: false,
                        sortable: false}
                    ]
                }];

                const columnsAdd = [{
                    Header: 'Add medical reports',
                    columns: [
                    {
                        id: 'appType',
                        Header: 'Type',
                        accessor: d => d.type},
                    {
                        id: 'appDate',
                        Header: 'Date',
                        accessor: d => moment(d.date).format("DD-MMM-YYYY hh:mm")},
                    {
                        id: 'appDuration',
                        Header: 'Duration',
                        accessor: d => d.duration},
                    {
                        id: 'appFast',
                        Header: 'Fast exam',
                        accessor: d => d.fastExam === 'Regular'? 'No' : 'Yes'},
                    {
                        id: 'appService',
                        Header: 'Service',
                        accessor: d => d.service},
                    {
                        id: 'appRoom',
                        Header: 'Room',
                        accessor: d => d.operationRoom},
                    {
                    Header: "",
                    Cell: ({ original }) => (
                        <center><Button type="black" click={() => {
                            console.log(original);
                            this.setState({isModalOpen : true});
                            this.setState({medicalReport: original.medicalReport});
                            console.log(this.state.medicalReport);
                        }
                    }>
                            Add report
                        </Button></center>),
                    filterable: false,
                    sortable: false}
                    ]
                }];

                /*let seeMedicalReport = this.state.medicalHistory.appointments.map(el => {
                    if (el.assigned && el.medicalReport !== null) {
                        this.setState({seeMedicalReport: true})
                        return el;
                    }
                });*/

                /*let addMedicalReport = this.state.medicalHistory.appointments.map(el => {
                    console.log(el.assigned);
                    console.log(el.assigned && el.medicalReport === null);
                    if (el.assigned && (el.medicalReport === null)) {
                        this.setState({addMedicalReport: true})
                        return el;
                    }
                });*/

                console.log("Stateovi u rendeeru");
                console.log(this.state.seeMedicalReport.length);
                console.log(this.state.addMedicalReport.length);
                content = (
                    <Auxiliary>
                        <div className={classes.Header}>
                            <h3 style={{color: 'white'}}>Medical history</h3>
                        </div>
                        <div className={classes.Medicalhistory}>
                            <div className = "row">
                                <div className="col-md-9 col-lg-9 ">
                                    <table className="table table-user-information">
                                        <tbody>
                                            <tr>
                                                <td>Patient:</td>
                                                <td>{this.props.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Weight:</td>
                                                <td>{this.state.medicalHistory.weight} kg</td>
                                            </tr>
                                            <tr>
                                                <td>Height:</td>
                                                <td>{this.state.medicalHistory.height} cm</td>
                                            </tr>
                                            <tr>
                                                <td>Dioptre:</td>
                                                <td>{this.state.medicalHistory.dioptre}</td>
                                            </tr>
                                            <tr>
                                                <td>Allergies:</td>
                                                <td>{this.state.medicalHistory.allergies}</td>
                                            </tr>           
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-3">
                                    <div className="row" style={{textAlign: 'right', paddingRight: '15px', float: 'right'}}>
                                        <div style={{fontSize: '1.25em'}}>
                                            <Button type = 'black' click = {this.props.back}>Back</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                  <li className="nav-item">
                                    <a className="nav-link text-dark active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">All appointments</a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="nav-link text-dark" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">See medical reports</a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="nav-link text-dark" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Add medical reports</a>
                                  </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <br/>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className={classes.Appointments}>
                                            <ReactTable data = {this.state.medicalHistory.appointments}
                                                    pageSize={(this.state.medicalHistory.appointments.length > 5) ? 5 : this.state.medicalHistory.appointments.length}
                                                    columns = {columns}
                                                    filterable = {true}
                                                    defaultFilterMethod={(filter, row, column) => {
                                                        const id = filter.pivotId || filter.id
                                                        console.log(row[id]);
                                                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                                                      }}/>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                  <br/>
                                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className={classes.Appointment}>
                                        <div className={classes.Appointments}>
                                            <ReactTable data = {this.state.seeMedicalReport}
                                                    pageSize={(this.state.seeMedicalReport.length > 5) ? 5 : this.state.seeMedicalReport.length}
                                                    columns = {columnsSee}
                                                    filterable = {true}
                                                    defaultFilterMethod={(filter, row, column) => {
                                                        const id = filter.pivotId || filter.id
                                                        console.log(row[id]);
                                                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                                                      }}/>
                                        </div>
                                    </div>
                                  </div>
                                  <br/>
                                  <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                    <div className={classes.Appointment}>
                                        <div className={classes.Appointments}>
                                            <ReactTable data = {this.state.addMedicalReport}
                                                    pageSize={(this.state.addMedicalReport.length > 5) ? 5 : this.state.addMedicalReport.length}
                                                    columns = {columnsAdd}
                                                    filterable = {true}
                                                    defaultFilterMethod={(filter, row, column) => {
                                                        const id = filter.pivotId || filter.id
                                                        console.log(row[id]);
                                                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                                                      }}/>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <Modal show = {this.state.isModalOpen} modalClosed = {this.closeModal} largeWidth = {true}>
                            <MedicalReport medicalReport = {this.state.medicalReport}  show = {this.state.isModalOpen} back = {() => this.closeModal()}/>
                        </Modal>
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