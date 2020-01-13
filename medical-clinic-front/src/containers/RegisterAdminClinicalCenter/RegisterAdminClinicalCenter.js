import React, { Component } from 'react';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

class RegisterAdminClinicalCenter extends Component {
	state = {
        name: '',
        lastName: '',
        email: '',
        city: '',
        address: '',
        state: '',
        mobile: '',
        userRole: 'ADMINCLINICALCENTER',
    }

    registerAdminClinicalCenter = (event) => {
    	event.preventDefault();

    	const newAdminClinicalCenter = {
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email,
            city: this.state.city,
            address: this.state.address,
            state: this.state.state,
            mobile: this.state.mobile
    	}

        axios.post('/admin-clinic-center/add-new-administrator-of-clinical-center', newAdminClinicalCenter, {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
        	.then(rsp => {
                console.log(rsp);
            })
            .catch(err => alert('Unable to add admin of clinical center.\nReason: ' + err.response.data));

        this.setState({
        	name: '',
            lastName: '',
            email: '',
            city: '',
            address: '',
            state: '',
            mobile: '',
            userRole: 'ADMINCLINICALCENTER',
        })
    }

    render() {
    	return(
    			<div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
                            <h3>Register new admin of clinical center</h3>
                            <br/>
                            <form onSubmit = {this.registerAdminClinicalCenter} >
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
                			</form>
                </div>
    		);
    }
}
export default RegisterAdminClinicalCenter;