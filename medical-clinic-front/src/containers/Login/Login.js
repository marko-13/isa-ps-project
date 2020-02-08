import React, { Component } from 'react';
import axios from '../../axios';
import { withRouter } from 'react-router-dom';

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    loginSubmitHandler = () => {

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(this.props)

        axios.post('/users/login', user)
            .then(response => {
                localStorage.setItem("token", response.data.accessToken);
                this.props.history.push('/homepage');
            })
            .catch(err => {
                console.log(err);
            });


    }


    render() {
        return (
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-7 login-form-2" id='login_form'>
                        <h3>Login</h3>
                        <div className="form-group">
                            <input
                                id='login_input_username'
                                type="text"
                                className="form-control"
                                placeholder="Your Username *"
                                value={this.state.username}
                                onChange={(event) => this.setState({ username: event.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='login_input_password'
                                type="password"
                                className="form-control"
                                placeholder="Your Password *"
                                value={this.state.password}
                                onChange={(event) => this.setState({ password: event.target.value })} />
                        </div>
                        <div className="form-group">
                            <button id='login_button' className="login-form-2 btnSubmit" onClick={this.loginSubmitHandler}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
