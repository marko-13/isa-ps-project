import React, { Component } from 'react';

import classes from './NewExam.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios';

class NewExam extends Component {

    state = {
        serviceType: '',
        price: ''
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmitHandler = e => {
        e.preventDefault();

        const newExam = {
            ...this.state
        }

        axios.post('/service/save', newExam)
            .then(res => {
                window.location.reload();
            })
            .catch(err => alert('Unable to add medical examination.\nReason: ' + err.response.data));
    }

    refreshExaminations = () => {

    }

    render() {
        return (
            <div className={classes.Form + ' login-form-1'}>
                <h2>Add new medical exam</h2>

                <div className={classes.Inputs}>
                    <form>
                        <div className='form-row'>

                            <div className='col'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Examination(service) type"
                                    name="serviceType"
                                    value={this.state.serviceType}
                                    onChange={(event) => this.setState({serviceType: event.target.value})} />
                            </div>

                            <div className='col'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Price"
                                    name="price"
                                    value={this.state.price}
                                    onChange={(event) => this.setState({price: event.target.value})} />
                            </div>
                        </div>

                        <div className={classes.Buttons + ' row'}>
                            <Button type='green' click={this.onSubmitHandler}>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewExam;