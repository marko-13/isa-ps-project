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

        axios.post('', user)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
        

    }


    render() {
        return (
            <div>
                
            <div>
                <label>Username: </label>
                <input type='text' onChange={(event) => this.setState({username: event.target.value})}></input>
            </div>

            <div>
                <label>Username: </label>
                <input type='password' onChange={(event) => this.setState({password: event.target.value})}></input>
            </div>

            <div>
                <button onClick={this.loginSubmitHandler}>Login</button>
            </div>

            </div>
        );
    }
}

export default Login;