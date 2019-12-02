import React, { Component } from 'react';
import axios from '../../../axios';

import classes from './UserPasswordChangeForm.module.css';
import Button from '../../../components/UI/Button/Button';

class UserPasswordChangeForm extends Component {

    state = {
        oldPassword: '',
        newPassword: ''
    }

    onConfirmHandler = (event) => {
        event.preventDefault();

        const userInfo = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        }

        axios.post('/users/change-password', userInfo, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(res => {
            alert('Success!');
            this.setState({oldPassword: '', newPassword: ''});
            this.props.closeModal();
        })
        .catch(err => console.log(err));
    }

    onCloseHandler = (event) => {
        event.preventDefault();
        this.props.closeModal();
    }

    render() {
        return (
            <div>
                <h4>Change your password</h4>
                <form>
                    <input type='password' placeholder='Old password' className={classes.InputElement} value={this.state.oldPassword} onChange={(event) => this.setState({ oldPassword: event.target.value })} />
                    <input type='password' placeholder='New password' className={classes.InputElement} value={this.state.newPassword} onChange={(event) => this.setState({ newPassword: event.target.value })} />
                    <div style={{float: 'right'}}>
                        <Button style={{ margin: '0px 5px' }} type='green' click={this.onCloseHandler}>Close</Button>
                        <Button style={{ margin: '0px 5px' }} type='green' click={this.onConfirmHandler}>Confirm</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserPasswordChangeForm;