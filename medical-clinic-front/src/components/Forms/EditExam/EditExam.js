import React, { Component } from 'react';

import classes from './EditExam.module.css';
import Button from '../../UI/Button/Button';

class EditExam extends Component {

    state = {
        exam: {
            serviceType: '',
            price: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.exam !== this.props.exam) {
            this.setState({ exam: this.props.exam });
        }
    }

    changeHandler = event => {
        this.setState({
            exam: {
                ...this.state.exam,
                [event.target.name]: event.target.value
            }
        });
    }

    closeModalHandler = e => {
        e.preventDefault();
        this.props.closeModal();
    }

    onSubmitHandler = e => {
        e.preventDefault();

        //axios post this.state.exam
    }

    render() {
        return (
            <div className={classes.Form}>
                <h2>Edit exam</h2>

                <div className={classes.Inputs}>
                    <form>
                        <div className='form-row'>

                            <div className='col'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Examination(service) type"
                                    name="serviceType"
                                    value={this.state.exam.serviceType}
                                    onChange={this.changeHandler} />
                            </div>

                            <div className='col'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Price"
                                    name="price"
                                    value={this.state.exam.price}
                                    onChange={this.changeHandler} />
                            </div>
                        </div>

                        <div className={classes.Buttons + ' row'}>
                            <Button type='red' click={this.closeModalHandler}>Close</Button>
                            <Button type='green' click={this.onSubmitHandler}>Confirm</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditExam;