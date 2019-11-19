import React, { Component } from 'react';

import axios from '../../axios';

class Users extends Component {

    state = {
        users: null
    }

    getAllUsers = () => {
        axios.get('/userss/all')
            .then(users => this.setState({ users: users }))
            .catch(err => console.log(err));
    }

    render() {

        let users = null;

        if (this.state.users !== null) {
            users = this.state.users.data.map(data => {
                return <p>{data.email}</p>
            });
        }


        console.log(users);


        return (
            <div style={{textAlign: 'center', width: '100%'}}>
                <button onClick={this.getAllUsers}>Show users</button>
                {users}
            </div>
        );
    }
}

export default Users;