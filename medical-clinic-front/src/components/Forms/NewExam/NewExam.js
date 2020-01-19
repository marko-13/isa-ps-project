import React, { Component } from 'react';

import classes from './NewExam.module.css';
import Button from '../../../components/UI/Button/Button';

class NewExam extends Component {

    state = {
        serviceType: '',
        price: ''
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmitHandler = e => {

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
                                    name="serviceType" />
                            </div>

                            <div className='col'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Price"
                                    name="price" />
                            </div>
                        </div>

                        <div className={classes.Buttons + ' row'}>
                            <Button type='green'>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewExam;