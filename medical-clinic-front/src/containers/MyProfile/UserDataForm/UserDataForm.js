import React, { Component } from 'react';
import axios from '../../../axios';

import Button from '../../../components/UI/Button/Button';
import classes from './UserDataForm.module.css';
import {withRouter} from 'react-router-dom';


class UserDataForm extends Component {

    state = {
        ...this.props.user,
        changedEmail: false
    }

    onConfirmHandler = (event) => {
        event.preventDefault();

        const updatedUser = {
                            name: this.state.name,
                            lastName: this.state.lastname,
                            email: this.state.email,
                            adress: this.state.address,
                            city: this.state.city,
                            state: this.state.state,
                            mobile: this.state.mobile
                        };

        axios.post('/user/update', updatedUser, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(response => {
            alert('Success!');
            if(this.state.changedEmail){
              this.props.history.push('/');
              localStorage.removeItem('token');
            }
            //alert(localStorage.getItem('token'));
            this.setState({
                name: '',
                lastName: '',
                email: '',
                address: '',
                city: '',
                state: '',
                mobile: ''
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
                    <input type='email' placeholder='Email' className={classes.InputElement} value={this.state.email} onChange={(event) => this.setState({ email: event.target.value, changedEmail: true })} />
                    <input type='text' placeholder='Address' className={classes.InputElement} value={this.state.address} onChange={(event) => this.setState({ address: event.target.value })} />
                    <input type='text' placeholder='City' className={classes.InputElement} value={this.state.city} onChange={(event) => this.setState({ city: event.target.value })} />
                    <input type='text' placeholder='State' className={classes.InputElement} value={this.state.state} onChange={(event) => this.setState({ state: event.target.value })} />
                    <input type='text' placeholder='Mobile' className={classes.InputElement} value={this.state.mobile} onChange={(event) => this.setState({ mobile: event.target.value })} />
                    <div style={{float: 'right'}}>
                        <Button style={{ margin: '0px 5px' }} type='green' click={this.onCloseHandler}>Close</Button>
                        <Button style={{ margin: '0px 5px' }} type='green' click={this.onConfirmHandler}>Confirm</Button>
                    </div>
                </form>
                <p>* On email change you will be redirected to login/registration page</p>

            </div>
        );
    }
}

export default withRouter(UserDataForm);
