import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';
import {withRouter} from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import UserInfo from '../../../components/Homepage/UserInfo/UserInfo';
import UserCard from '../../Homepage/UserCards/UserCard/UserCard';
import MedicalHistory from '../../../containers/MedicalStaff/Patients/MedicalHistory/MedicalHistory';

class PatientsTable extends Component {

    state = {
        patients: null,
        name: '',
        lastname: '',
        role: '',
        showPatient: false,
        userCardClick: false,
        back: false,
        medicalHistoryContent: null
    }

    getAllPatients = () => {
        axios.get('/patient/getAll')
            .then(res => this.setState({ patients: res.data }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getAllPatients();
    }

    onShowProfileHandler = (patient) => {
        this.setState({
            name: patient.name,
            lastname: patient.lastname,
            showPatient: true
        })

        const queryParams = [];
        queryParams.push(encodeURIComponent('patientId') + '=' + encodeURIComponent(patient.id));
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: this.props.match.path,
            search: '?' + queryString
        });
    }

    onClickUserCardHandler = () => {
        this.setState({userCardClick: true});
    }

    onClickBackHandler = () => {
        this.setState({userCardClick: false});
        console.log('Usao ovde')
    }

    render() {
        let table = null;
        let userCards = null;
        let medicalHistoryContent = null;
        let displayFirst = 'block';
        let displaySecond = 'none';
        let displayThird = 'none';

        if (this.state.patients === null) {
            table = <h2>Loading....</h2>;
        } else if (this.state.patients.length !== 0) {

            const columns = [{
                Header: 'List of all patients',
                columns: [
                    {
                        id: 'name',
                        Header: 'Name',
                        accessor: d => d.name
                    },
                    {
                        id: 'lastname',
                        Header: 'Lastname',
                        accessor: d => d.lastname
                    },
                    {
                        id: 'jmbg',
                        Header: 'JMBG',
                        accessor: d => d.jmbg
                    },
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button type='green' click={() => this.onShowProfileHandler(original)}>Show profile</Button></center>),
                        filterable: false,
                        sortable: false
                    }]
            }];

            userCards = (
                <Auxiliary>
                        {/*<UserCard full query={this.props.location.search} buttonText="Show" cardText="Show patients medical history" link={this.props.match.path + '/medical-history'} />*/}
                        <UserCard full special click={() => this.onClickUserCardHandler()} buttonText="Show" cardText={"Show patients medical history"} />
                        <UserCard full query={this.props.location.search} buttonText="Start" cardText="Start an examination for this patient" link={'/homepage/start-exam'} />
                </Auxiliary>
            );

            table = (
                <ReactTable
                    data={this.state.patients}
                    columns={columns}
                    className="-striped"
                    pageSize={7}
                    filterable={true}
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id
                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                    }}
                    pageSize={(this.state.patients.length > 7) ? 7 : this.state.patients.length}
                />
            )

            if (this.state.showPatient) {
                displayFirst = 'none';
                displaySecond = 'block';
                displayThird = 'none';
            }

            if (this.state.userCardClick) {
                displayFirst = 'none';
                displaySecond = 'none';
                displayThird = 'block';

                medicalHistoryContent = (
                    <MedicalHistory query = {this.props.location.search} back={() => this.onClickBackHandler()} name={this.state.name + " " + this.state.lastname}/>
                )
            }
        } else {
            table = <h2>Something is not right.</h2>;
        }

        return (
            <Auxiliary>
                <div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
                    <div style = {{display: displayFirst}}>
                        {table}
                    </div>
                    <div style = {{display: displaySecond}}>
                        <div className='row'>
                            {this.state.showPatient ? <UserInfo full name={this.state.name} lastname={this.state.lastname} role='Patient' /> : null}
                            <div className='col-5' style = {{flex: '0 0 41%', maxWidth: '100%'}}>
                                {this.state.showPatient ? userCards : null}
                            </div>
                        </div>
                        <div style={{fontSize: '1.25em', paddingTop: '1%'}}>
                            <Button type='black' click = {() => this.setState({showPatient: false})} style = {{padding: '1px 10px'}}>Back</Button>
                        </div>
                    </div>
                    <div style = {{display: displayThird}}>
                        {medicalHistoryContent}
                    </div>
                </div>
            </Auxiliary>
        );

    }
}

export default withRouter(PatientsTable);
