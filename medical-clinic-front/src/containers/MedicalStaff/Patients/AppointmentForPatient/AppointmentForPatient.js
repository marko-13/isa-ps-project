import React, { Component } from 'react';

import classes from './AppointmentForPatient.module.css';
import DatePicker from "react-datepicker";
import Button from '../../../../components/UI/Button/Button';
import axios from '../../../../axios';

class AppointmentForPatient extends Component {

    state = {
        startDate: null,
        appointmentType: '',
        error: false
    }

    handleChange = date => {
        this.setState({
            startDate: date.getTime(),
        });
    };

    onSubmitHandler = () => {

        console.log(this.state);

        if (this.state.startDate === null || this.state.appointmentType === '' || this.state.appointmentType === null || this.state.appointmentType === undefined) {
            console.log('dsadsads')
            this.setState({ error: true });
            return;
        }

        const lastAppointmentId = this.props.match.params.examID;

        const data = {
            startDate: this.state.startDate,
            appointmentType: this.state.appointmentType,
            lastAppointmentId: lastAppointmentId
        };

        console.log(data);

        axios.post('/appointment/addAnotherForPatient', data)
            .then(res => {
                alert("Novi pregled uspesno napravljen");
                this.props.history.push('/homepage');
            })
            .catch(err => alert('Datum je zauzet!'));
    }


    render() {

        return (
            <div className={classes.Content + ' col-7 login-form-1'}>
                <div className={classes.Header}>
                    <h2>Add next operation/examination for this patient</h2>
                </div>

                <div className={'row'}>
                    <div className="col-3">
                        <label for="selecttype">Select type</label>
                        <select class="form-control" id="selecttype" onChange={e => this.setState({ appointmentType: e.target.value })}>
                            <option disabled selected value> -select an option- </option>
                            <option>Examination</option>
                            <option>Operation</option>
                        </select>
                    </div>

                    <div style={{ marginTop: '35px', marginLeft: '25px' }}>
                        <label htmlFor='newappdatepicker' style={{ margin: '0px 10px' }}>Select date</label>
                        <DatePicker
                            id='newappdatepicker'
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="yyyy-MM-dd, h:mm aa" />
                    </div>
                </div>



                <br>
                </br>

                <p style={{ color: 'red', fontSize: '20px' }} hidden={!this.state.error}>Please fill all of the fields!</p>

                <div>
                    <Button style={{ float: 'right' }} click={this.onSubmitHandler}>Schedule</Button>
                </div>

            </div>
        );
    }
}

export default AppointmentForPatient;