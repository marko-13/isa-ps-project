import React, { Component } from 'react';
import axios from '../../axios';

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

        console.log(user);

        axios.post('/users/login', user)
            .then(response => {
                console.log(response);
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
                        <h3>Login</h3>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Your username *"
                                    value={this.state.username}
                                    onChange={(event) => this.setState({username: event.target.value})}
                                    />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Your Password *"
                                    value={this.state.password}
                                    onChange={(event) => this.setState({password: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <button  className="btn-primary" onClick={this.loginSubmitHandler}>Login</button>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;