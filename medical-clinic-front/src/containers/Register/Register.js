import React, { Component } from 'react';
import axios from '../../axios';

class Register extends Component {

    state = {
        name: '',
        password: '',
        confirmPassowrd: '',
        email: '',
        lastname: '',
        jmbg: '',
        adress: '',
        city: '',
        state: '',
        mobile: ''
    }

    registerSubmitHandler = () => {

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            lastName: this.state.lastname,
            jmbg: this.state.jmbg,
            userRole: 'PATIENT',
            adress: this.state.adress,
            city: this.state.city,
            state: this.state.state,
            mobile: this.state.mobile
        }

        if(this.state.password !== this.state.confirmPassowrd){
            alert('Your password does not match!');
            return;
        }
        
        if(this.state.password === null || this.state.password === undefined || this.state.password === ""){
            alert('Username and password must not be empty!');
            return;
        }

        if(this.state.email === null || this.state.email === undefined || this.state.email === ""){
            alert('Username and password must not be empty!')
            return;
        }

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
                    <div className="col-md-7 login-form-1" style={{margin: 'auto'}}>
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
                                type="password"
                                className="form-control"
                                placeholder="Confirm password *"
                                value={this.state.confirmPassowrd}
                                onChange={(event) => this.setState({ confirmPassowrd: event.target.value })} />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your Name"
                                value={this.state.name}
                                onChange={(event) => this.setState({ name: event.target.value })} />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your Lastname"
                                value={this.state.lastname}
                                onChange={(event) => this.setState({ lastname: event.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your JMBG"
                                value={this.state.jmbg}
                                onChange={(event) => this.setState({ jmbg: event.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Adress"
                                value={this.state.adress}
                                onChange={(event) => this.setState({ adress: event.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="City"
                                value={this.state.city}
                                onChange={(event) => this.setState({ city: event.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="State"
                                value={this.state.state}
                                onChange={(event) => this.setState({ state: event.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mobile"
                                value={this.state.mobile}
                                onChange={(event) => this.setState({ mobile: event.target.value })}
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