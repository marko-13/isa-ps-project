import React, { Component } from 'react';
import axios from '../../../axios';

import classes from './NewDoctor.module.css';
import Button from '../../UI/Button/Button';

const initialState = {
        name: '',
        lastName: '',
        email: '',
        city: '',
        adress: '',
        state: '',
        mobile: '',
        shift: '',
        userRole: 'DOCTOR'
}

class NewDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = initialState;
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      submitHandler = (event) => {
         event.preventDefault();

        const newDoctor = {
            ...this.state
        }

        axios.post('/doctor/save', newDoctor)
            .then(response => {
                this.setState(initialState)
                this.props.getAllDoctors();
                alert('Doctor added successfully.');
            })
            .catch(err => console.log(err));

      }

      refreshDoctors = () => {
          this.props.getAllDoctors();
      }

    render() {
        return (
            <div className={classes.Form + ' login-form-1'}>
                <h2>Add new doctor</h2>

                <div className={classes.Inputs}>
                    <form>
                        <div className='form-row'>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="First name" name="name" required onChange={this.changeHandler} value={this.state.name}/>
                            </div>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Last name" name="lastName" required onChange={this.changeHandler} value={this.state.lastName}/>
                            </div>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Email" name="email" required onChange={this.changeHandler} value={this.state.email}/>
                            </div>

                        </div>

                        <div className='form-row'>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="City" name="city" onChange={this.changeHandler} value={this.state.city}/>
                            </div>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Address" name="adress" onChange={this.changeHandler} value={this.state.adress}/>
                            </div>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="State" name="state" onChange={this.changeHandler} value={this.state.state}/>
                            </div>

                        </div>

                        <div className='form-row'>

                            <div className='col-4'>
                                <input type="text" className="form-control" placeholder="Mobile" name="mobile" onChange={this.changeHandler} value={this.state.mobile}/>
                            </div>

                            <div className='col-4'>
                                <input type="text" className="form-control" placeholder="Shift" name="shift" required onChange={this.changeHandler} value={this.state.shift}/>
                            </div>

                        </div>

                        <div className={classes.Buttons + ' row'}>
                            <Button type='green' click={this.submitHandler}>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewDoctor;