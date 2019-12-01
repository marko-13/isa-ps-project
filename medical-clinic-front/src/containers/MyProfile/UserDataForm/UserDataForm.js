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

        const updatedUser = {...this.state};

        axios.put('/user/changeInfo', updatedUser, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }

    onCloseHandler = (event) => {
        event.preventDefault();
        this.props.closeModal();
    }


    render() {

        // let formData = null;

        // formData = (
        //     <div>
        //         {this.state.name === '' ? null : <input type='text' placeholder='Name' value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}/>}
        //         {this.state.lastname === '' ? null : <input type='text' placeholder='Lastname' value={this.state.lastname} onChange={(event) => this.setState({lastname: event.target.value})}/>}
        //         {this.state.email === '' ? null : <input type='email' placeholder='Email' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/>}
        //     </div>  
        // );

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