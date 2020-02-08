import React, { Component } from 'react';
import axios from '../../../axios';
import { withRouter } from "react-router";

import classes from './ChooseAvailableDoctorsForm.module.css';
import {Typeahead} from 'react-bootstrap-typeahead';
import Button from '../../UI/Button/Button';

class ChooseAvailableDoctorsForm extends Component {

    state = {
        availableDoctors: [],
        selectedDoctor: null,
        errorHidden: true
    }

    componentDidMount() {

        const data = {
            start: this.props.start,
            appId: this.props.appId,
            roomId: this.props.roomId
        }
        
        axios.post("/doctor/getAllAvailable", data)
            .then(res => {
                console.log(res.data);
                this.setState({availableDoctors : res.data});
            })
            .catch(err => console.log(err));
    }

    //doctor => dobijamo listu doktoru, ako zelimo selektovanog pristupamo sa doktor[0]
    onSelectChange = doctor => {

        if(doctor !== null || doctor !== undefined){
            this.setState({selectedDoctor: doctor[0]});
        }
     
    }

    onAddDoctorHandler = () => {
        if(this.state.selectedDoctor === null || this.state.selectedDoctor === undefined){
            this.setState({errorHidden: false});
            return;
        }

        const sendDoctor = {
            appId: this.props.appId,
            roomId: this.props.roomId,
            doctorId: this.state.selectedDoctor.id
        }

        axios.post("/appointment/changeDoctorAndAddRoomToAppointment", sendDoctor)
            .then(res => {
                alert(`Doctor ${this.state.selectedDoctor.name} ${this.state.selectedDoctor.lastname} has been added sucessfully!`);
                this.props.history.push('/homepage/admin-clinic');
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {

        console.log(this.state.selectedDoctor);

        return (
            <div>
                <div className={classes.Header}>
                    <h2>Select new doctor for appointment</h2>
                </div>
                <h5>Doktor isn't available for this date, please choose another doctor.</h5>
                <br></br>
                <h4>Available doctors</h4>
                <Typeahead 
                    id = "showdoctors" 
                    placeholder="Choose a doctor..." 
                    onChange={(selected) => this.onSelectChange(selected)}
                    labelKey={option => `${option.name} ${option.lastname}`}
                    options = {this.state.availableDoctors}
                  />
                  <br></br>
                  <p hidden={this.state.errorHidden} className={classes.Error}>Please select a doctor!</p>
                  <div className={classes.Buttons}>
                      <Button click={this.props.closeModa}>Back</Button>
                      <Button click={this.onAddDoctorHandler}>Add doctor</Button>
                  </div>
            </div>
        );
    }
}

export default withRouter(ChooseAvailableDoctorsForm);