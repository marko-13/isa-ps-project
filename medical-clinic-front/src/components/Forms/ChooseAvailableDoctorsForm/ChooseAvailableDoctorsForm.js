import React, { Component } from 'react';
import axios from '../../../axios';

class ChooseAvailableDoctorsForm extends Component {

    state = {
        availableDoctors: []
    }

    componentDidMount() {

        console.log("COMPONENT DID MOUNT");

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
                <h2>Doktor isn't available for this date, please choose another doctor.</h2>
                <h1>LISTA DOKTORA</h1>
            </div>
        );
    }
}

export default ChooseAvailableDoctorsForm;