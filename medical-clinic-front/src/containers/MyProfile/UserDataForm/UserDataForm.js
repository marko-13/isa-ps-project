import React, { Component } from 'react';
import axios from '../../../axios';

import Button from '../../../components/UI/Button/Button';
import classes from './UserDataForm.module.css';

class UserDataForm extends Component {

    state = {
        ...this.props.user
    }

    onConfirmHandler = (event) => {
        event.preventDefault();

        const updatedUser = {
                            name: this.state.name,
                            lastName: this.state.lastname,
                            email: this.state.email
                        };

        console.log(updatedUser);

        axios.post('/user/update', updatedUser, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(response => {
            alert('Success!');
            this.setState({
                name: '',
                lastName: '',
                email: ''
            });
            this.props.closeModal();
            window.location.reload(false); 
        })
        .catch(err => console.log(err));
    }

    onCloseHandler = (event) => {
        event.preventDefault();
        this.props.closeModal();
    }


    render() {

        return (
            <div className={[classes.formData, classes.Input].join(' ')}>
                <h4>Edit your account</h4>
                <form>
                    <input type='text' placeholder='Name' className={classes.InputElement} value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
                    <input type='text' placeholder='Lastname' className={classes.InputElement} value={this.state.lastname} onChange={(event) => this.setState({ lastname: event.target.value })} />
                    <input type='email' placeholder='Email' className={classes.InputElement} value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                    <div style={{float: 'right'}}>
                        <Button style={{ margin: '0px 5px' }} type='green' click={this.onCloseHandler}>Close</Button>
                        <Button style={{ margin: '0px 5px' }} type='green' click={this.onConfirmHandler}>Confirm</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserDataForm;