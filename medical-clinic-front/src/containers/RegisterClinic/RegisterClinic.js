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

    registerClinic = (event) => {
        event.preventDefault();

    	const newClinic = {
    		name: this.state.name,
    		address: this.state.address,
    		description: this.state.description
    	}

        axios.post('/admin-clinic-center/add-new-clinic', newClinic, {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
        	.then(rsp => {
                alert('Added new clinic with name: \n' + rsp.data.name);
            })
            .catch(err => alert('Unable to add new clinic.\nReason: ' + err.response.data));

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
                        <br/>
                        <form onSubmit = {this.registerClinic} >
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name of the clinic *"
                                    value={this.state.name}
                                    onChange={(event) => this.setState({ name: event.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Address of the clinic *"
                                    value={this.state.address}
                                    onChange={(event) => this.setState({ address: event.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Description of the clinic *"
                                    value={this.state.description}
                                    onChange={(event) => this.setState({ description: event.target.value })}
                                    required
                                />
                            </div>

                            <button className="btnSubmit" style={{width: '15%', float: 'right'}} type = "submit">Register</button>
                        </form>
            </div>
		)
	}
}

export default RegisterClinic;