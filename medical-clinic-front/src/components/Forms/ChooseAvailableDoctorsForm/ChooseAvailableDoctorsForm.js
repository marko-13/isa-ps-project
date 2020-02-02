import React, { Component } from 'react';
import axios from '../../../axios';

import classes from './ChooseAvailableDoctorsForm.module.css';

class ChooseAvailableDoctorsForm extends Component {

    state = {
        availableDoctors: []
    }

    componentDidMount() {

        const data = {
            start: this.props.start,
            appId: this.props.appId,
            roomId: this.props.roomId
        }

        console.log(data);
        

        axios.post("/doctor/getAllAvailable", data)
            .then(res => {
                console.log(res.data);
                this.setState({availableDoctors : res.data});
            })
            .catch(err => console.log(err));
    }

    render() {

        return (
            <div>
                <div>
                    <h2>Select new doctor for appointment</h2>
                </div>
                <h2>Doktor isn't available for this date, please choose another doctor.</h2>
                <h1>LISTA DOKTORA</h1>
            </div>
        );
    }
}

export default ChooseAvailableDoctorsForm;