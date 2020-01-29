import React, { Component } from 'react';

import classes from './EditClinic.module.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios';

class EditClinic extends Component {

    state = {
        ...this.props.clinic
    }

    onCloseHandler = event => {
        event.preventDefault();
        this.props.closeModal();
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onConfirmHandler = event => {
        event.preventDefault();

        const updatedClinic = {
            ...this.state
        }


        axios.post('/clinics/save', updatedClinic)
            .then(response => {
                this.props.updateClinic(updatedClinic);
                this.props.closeModal();
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className={classes.Form}>
                <h3 className={classes.Header}>Edit clinic</h3>

                <div className={classes.Inputs}>
                    <form>
                        <div className='form-col'>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={this.changeHandler} required />
                            </div>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Address" name="address" value={this.state.address} onChange={this.changeHandler} required />
                            </div>

                            <div className='col'>
                                <label htmlFor="description">Description</label>
                                <textarea type="text" className="form-control" id="description" name="description" value={this.state.description} onChange={this.changeHandler} rows='3' />
                            </div>

                            <div className={classes.Buttons + ' col'}>
                                <Button type='green' click={this.onConfirmHandler}>Confirm</Button>
                                <Button type='red' click={this.onCloseHandler}>Close</Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditClinic;