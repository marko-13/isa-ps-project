import React, { Component } from 'react';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

class RegisterClinic extends Component {

	state = {
        name: "",
        address: "",
        description: ""
    }

    registerClinic = () => {

    	const newClinic = {
    		name: this.state.name,
    		address: this.state.address,
    		description: this.state.description
    	}

        axios.post('/admin-clinic-center/add-new-clinic', newClinic, {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
        	.then(rsp => {
                console.log(rsp);
            })
            .catch(err => console.log(err));

        this.setState({
        	name: "",
        	address: "",
        	description: ""
        })
    }

	render() {
		return(
			<div className="col-md-7 login-form-1" style={{margin: 'auto'}}>
                        <h3>Register new clinic</h3>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name of the clinic *"
                                value={this.state.name}
                                onChange={(event) => this.setState({ name: event.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Address of the clinic *"
                                value={this.state.address}
                                onChange={(event) => this.setState({ address: event.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Description of the clinic *"
                                value={this.state.description}
                                onChange={(event) => this.setState({ description: event.target.value })}
                            />
                        </div>

                        <div className="form-group" style={{float: 'right', paddingRight: '2%'}}>
                            <button className="btnSubmit" onClick = {this.registerClinic} style={{margin: '20%', width: '150%', padding: '20%'}}>Register</button>
                        </div>
            </div>
		)
	}
}

export default RegisterClinic;