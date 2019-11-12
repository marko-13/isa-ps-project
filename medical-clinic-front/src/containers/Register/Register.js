import React, { Component } from 'react';
import axios from '../../axios';

class Register extends Component {

    state = {
        username: '',
        password: '',
        email: ''
    }

    registerSubmitHandler = () => {

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }

        console.log(newUser);

        axios.post('', newUser)
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
                                type="text"
                                className="form-control"
                                placeholder="Your username *"
                                value={this.state.username}
                                onChange={(event) => this.setState({ username: event.target.value })}
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
                                placeholder="Your Email *"
                                value={this.state.email}
                                onChange={(event) => this.setState({ email: event.target.value })} />
                        </div>

                        <div className="form-group">
                            <button className="btn-primary" onClick={this.registerSubmitHandler}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;