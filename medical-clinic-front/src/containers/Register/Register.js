import React, { Component } from 'react';
import axios from '../../axios';

class Register extends Component {

    state = {
        name: '',
        password: '',
        email: '',
        lastname: '',
        jmbg: ''
    }

    registerSubmitHandler = () => {

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            lastName: this.state.lastname,
            jmbg: this.state.jmbg,
            userRole: 'PATIENT'
        }

        console.log(newUser);

        axios.post('/users/register', newUser)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

    }


    render() {
        return (
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 login-form-1">
                        <h3>Register</h3>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Your Email *"
                                value={this.state.email}
                                onChange={(event) => this.setState({ email: event.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Your Password *"
                                value={this.state.password}
                                onChange={(event) => this.setState({ password: event.target.value })} />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your Name *"
                                value={this.state.name}
                                onChange={(event) => this.setState({ name: event.target.value })} />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your Lastname *"
                                value={this.state.lastname}
                                onChange={(event) => this.setState({ lastname: event.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your JMBG *"
                                value={this.state.jmbg}
                                onChange={(event) => this.setState({ jmbg: event.target.value })}
                            />
                        </div>
                    

                        <div className="form-group">
                            <button className="btnSubmit" onClick={this.registerSubmitHandler}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;