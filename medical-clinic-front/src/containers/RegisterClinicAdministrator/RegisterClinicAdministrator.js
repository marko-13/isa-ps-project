import React, { Component } from 'react';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class RegisterClinicAdministrator extends Component {
	state = {
        clinicID: '',
        clinicName: '',
        name: '',
        lastName: '',
        email: '',
        city: '',
        address: '',
        state: '',
        mobile: '',
        userRole: 'ADMINCLINIC',
        clinics: '',
        next: false
    }

    getClinics = () => {
        axios.get('/clinics/get-all-clinical-center-clinics', {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
            .then(clinics => {
                this.setState({clinics: clinics});
            })
            .catch(err => {
                this.setState({clinics: []})
                console.log(err);
            });
    }

    componentDidMount() {
        this.getClinics();
    }

    registerClinicAdministrator = (event) => {
        //Prevent refreshing page after submit
        event.preventDefault();

    	const newClinicAdministrator = {
    		clinicID: this.state.clinicID,
            clinicName: this.state.clinicName,
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email,
            city: this.state.city,
            address: this.state.address,
            state: this.state.state,
            mobile: this.state.mobile
    	}

        axios.post('/admin-clinic-center/add-new-clinic-administrator', newClinicAdministrator, {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
        	.then(rsp => {
                console.log(rsp);
                alert('Successfuly registered admin of clinic: ' + rsp.data.clinicName + '\nEmail of admin: ' + rsp.data.email);
            })
            .catch(err => alert('Unable to add clinic administrator.\nReason: ' + err.response.data));

        this.setState({
            clinicID: '',
            clinicName: '',
        	name: '',
            lastName: '',
            email: '',
            city: '',
            address: '',
            state: '',
            mobile: '',
            userRole: 'ADMINCLINIC',
            next: false
        })
    }

	render() {
        if (this.state.clinics.data !== undefined) {
            let displayFirst = "";
            let displaySecond = "";

            if (this.state.next) {
                displayFirst = 'none';
                displaySecond = 'block';
            } else {
                displayFirst = 'block';
                displaySecond = 'none';
            }

            const columns = [{
                    Header: 'Choose clinic',
                    columns: [
                    {
                        id: 'clinicID',
                        Header: 'Clinic ID',
                        accessor: d => d.id},
                    {
                        id: 'clinicName',
                        Header: 'Clinic name',
                        accessor: d => d.name},
                    {
                        id: 'clinicAddress',
                        Header: 'Clinic address',
                        accessor: d => d.address}
                    ]
                }];
    		return(
    			<div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
                            <h3>Register new clinic's administrator</h3>
                            <br/>
                            <div style = {{display: displayFirst}}>
                                <ReactTable data = {this.state.clinics.data}
                                        pageSize={(this.state.clinics.data.length > 5) ? 5 : this.state.clinics.data.length}
                                        getTrProps={(state, rowInfo, column, instance) => ({
                                            onClick: e => {
                                                this.setState({clinicID: rowInfo.original.id, clinicName: rowInfo.original.name, next: true});}
                                        })}
                                        columns = {columns}
                                        filterable = {true}
                                        defaultFilterMethod={(filter, row, column) => {
                                            const id = filter.pivotId || filter.id
                                            console.log(row[id]);
                                            return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                                          }}/>
                            </div>

                            <div style = {{display: displaySecond}}>
                                <form onSubmit = {this.registerClinicAdministrator} >
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name *"
                                            value={this.state.name}
                                            onChange={(event) => this.setState({ name: event.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Last name *"
                                            value={this.state.lastName}
                                            onChange={(event) => this.setState({ lastName: event.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email *"
                                            value={this.state.email}
                                            onChange={(event) => this.setState({ email: event.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="City *"
                                            value={this.state.city}
                                            onChange={(event) => this.setState({ city: event.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Address *"
                                            value={this.state.address}
                                            onChange={(event) => this.setState({ address: event.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="State *"
                                            value={this.state.state}
                                            onChange={(event) => this.setState({ state: event.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Mobile *"
                                            value={this.state.mobile}
                                            onChange={(event) => this.setState({ mobile: event.target.value })}
                                            required
                                        />
                                    </div>
                                    
                                    <button className="btnSubmit" style={{width: '15%', float: 'right'}} type = "submit">Register</button>
                                    <button className="btnSubmit" onClick = {() => this.setState({next: false})} style={{width: '15%', float: 'right', marginRight: '1%'}}>Back</button>
                                </form>
                            
                            </div>
                </div>
    		);
        }

        return (null);
	}
}

export default RegisterClinicAdministrator;