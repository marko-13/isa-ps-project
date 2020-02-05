import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from '../../../axios';

import classes from './NewFastExamination.module.css';
import Button from '../../UI/Button/Button';
import DatePicker from "react-datepicker";


class NewFastExamination extends Component {

    state = {
        doctors: [],
        services: [],
        rooms: [],
        startDate: null,
        selectedDoctor: null,
        selectedService: null,
        selectedRoom: null,
        errorHidden: true,
        duration: ''
    }


    componentDidMount() {
        // axios.get("/service/getAll")
        //     .then(res => this.setState({ services: res.data }))
        //     .catch(err => console.log(err));
    }

    onInputChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeDateHandler = date => {

        if (date !== null) {

            const data = {
                start: date.getTime()
            }

            axios.post("/operationRoom/getAllAvailable", data)
                .then(res => this.setState({ rooms: res.data }))
                .catch(err => {
                    this.setState({ rooms: [] });
                    console.log(err);
                });

        }else {
            this.setState({ selectedRoom: null, selectedService: null, selectedDoctor: null });
            this.doctorstypeahead.getInstance().clear();
            this.roomstypeahead.getInstance().clear();
            this.servicestypeahead.getInstance().clear();
        }

        this.setState({
            startDate: date,
        });
    };

    onDoctorChangeHandler = selected => {
        if (selected === null || selected === undefined || selected.length === 0) {
            this.setState({ selectedDoctor: null, selectedService: null });
            this.roomstypeahead.getInstance().clear();
        } else {
            this.setState({ selectedDoctor: selected[0] });

            axios.post('/service/getAllFromDoctor/' + selected[0].id, null)
                .then(res => this.setState({ services: res.data }))
                .catch(err => {
                    this.setState({ services: [] });
                    console.log(err);
                });

        }

    }

    onServiceChangeHandler = selected => {
        if (selected === null || selected === undefined || selected.length === 0) {
            this.setState({ selectedService: null });
        } else {
            this.setState({ selectedService: selected[0] });
        }
    }

    onRoomChangeHandler = selected => {
        if (selected === null || selected === undefined || selected.length === 0) {
            this.setState({ selectedRoom: null, selectedService: null, selectedDoctor: null });
            this.doctorstypeahead.getInstance().clear();
            this.roomstypeahead.getInstance().clear();
        } else {
            this.setState({ selectedRoom: selected[0] });

            const data = {
                start: this.state.startDate.getTime()
            };


            axios.post('/doctor/getAllAvailable', data)
                .then(res => this.setState({ doctors: res.data }))
                .catch(err => {
                    this.setState({ doctors: [] });
                    console.log(err);
                });
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        if (!this.state.selectedDoctor) {
            this.setState({ errorHidden: false })
            return;
        }

        if (!this.state.selectedRoom) {
            this.setState({ errorHidden: false })
            return;
        }

        if (!this.state.selectedService) {
            this.setState({ errorHidden: false })
            return;
        }

        if (!this.state.startDate) {
            this.setState({ errorHidden: false })
            return;
        }

        const date = new Date(this.state.startDate);
        const miliseconds = date.getTime();


        const newExamination = {
            examStart: miliseconds,
            doctorId: this.state.selectedDoctor.id,
            serviceId: this.state.selectedService.id,
            operationRoomId: this.state.selectedRoom.roomId,
            duration: this.state.duration

        };

        axios.post('/examination/saveExamination', newExamination)
            .then(res => {
                alert("Examination added successfully!");
                window.location.reload();
            })
            .catch(err => console.log(err));
    }


    render() {

        console.log(this.state);
        return (
            <div className={classes.Form}>

                <div>
                    <h2 className={classes.Header}>
                        Create new medical examination
                    </h2>
                </div>

                <form>
                    <div className='form-row'>

                        <div className='col'>
                            <label htmlFor="datepicker" className={classes.Label}>Select date</label>
                            <DatePicker
                                id="datepicker"
                                selected={this.state.startDate}
                                onChange={this.onChangeDateHandler}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                timeCaption="time"
                                dateFormat="yyyy-MM-dd, h:mm aa" />

                        </div>

                        <div className='col'>
                            <input type="text" className="form-control" placeholder="Duration (min)" name="duration" required value={this.state.duration} onChange={e => this.onInputChangeHandler(e)} />

                        </div>

                    </div>

                    <hr></hr>

                    <div className='form-row'>

                        <div className='col'>
                            <Typeahead
                                ref={(typeahead) => this.roomstypeahead = typeahead}
                                disabled={!this.state.startDate}
                                id="showrooms"
                                placeholder="Choose a room"
                                onChange={(selected) => this.onRoomChangeHandler(selected)}
                                labelKey={option => `${option.name} (${option.number})`}
                                options={this.state.rooms}
                            />
                        </div>

                        <div className='col'>
                            <Typeahead
                                ref={(typeahead) => this.doctorstypeahead = typeahead}
                                disabled={!this.state.selectedRoom}
                                id="showdoctors"
                                placeholder="Choose a doctor"
                                onChange={(selected) => this.onDoctorChangeHandler(selected)}
                                labelKey={option => `${option.name} ${option.lastname}`}
                                options={this.state.doctors}

                            />
                        </div>

                        <div className='col'>
                            <Typeahead
                                ref={(typeahead) => this.servicestypeahead = typeahead}
                                disabled={!this.state.selectedDoctor}
                                id="showservices"
                                placeholder="Choose a service"
                                onChange={(selected) => this.onServiceChangeHandler(selected)}
                                labelKey={option => `${option.serviceType}, price: ${option.price}`}
                                options={this.state.services}
                            />
                        </div>

                    </div>

                    <br></br>
                    <p hidden={this.state.errorHidden} className={classes.Error}>Please fill all fields!</p>

                    <div className={classes.Buttons + ' row'}>
                        <Button
                            style={{ padding: '10px 15px' }}
                            click={e => this.onSubmitHandler(e)}>Add</Button>
                    </div>

                </form>
            </div>
        );
    }
}

export default NewFastExamination;