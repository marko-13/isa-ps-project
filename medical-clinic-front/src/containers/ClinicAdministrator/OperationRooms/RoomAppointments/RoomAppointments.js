import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import classes from './RoomAppointments.module.css';

import Button from '../../../../components/UI/Button/Button';

class RoomAppointments extends Component {

    state = {
        startDate: new Date(),
        availableSchedule: null,
        firstAvailable: null
    }

    componentDidMount() {
        this.checkFirstAvailable();
    }

    handleChange = date => {
        this.setState({
            startDate: date,
        });
    };

    checkAvailability = () => {
        const pickedDate = moment(this.state.startDate).valueOf();
        let flag = false;

        this.props.appointments.map(app => {

            if (flag) {
                return;
            }

            if (pickedDate >= app.date && (pickedDate <= app.date + (app.duration * 60000))) {
                this.setState({ availableSchedule: false });
                flag = true;
            } else {
                this.setState({ availableSchedule: true });
            }
        })

    }

    checkFirstAvailable = () => {
        const currentTime = moment().valueOf();
        
        this.props.appointments.map(app => {
            if(!(currentTime >= app.date && (currentTime <= app.date + (app.duration * 60000)))){
                this.setState({firstAvailable: moment(currentTime).format("DD-MM-YYYY hh:mm")})
            }else{
                this.setState({firstAvailable: moment(app.date + (app.duration * 60000).format("DD-MMM-YYYY hh:mm"))})
            }
        });

    }

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.Header}>
                    <h3>{this.props.roomName} {this.props.roomNumber}</h3>
                </div>

                <div className={classes.Subheader}>
                    <h5>Scheduled appointments for this room:</h5>
                    <div className={classes.Appointments}>
                        {this.props.appointments.map((app, i) => {
                            return (
                                <p key={i}><strong>{i + 1}. </strong><strong>DATE: </strong>{moment(app.date).format("DD-MMM-YYYY hh:mm")}, <strong>DURATION:</strong> {app.duration}min, <strong>TYPE:</strong> {app.fastExam}</p>
                            );
                        })}
                    </div>
                </div>

                <div className={classes.Subheader}>
                    <h5>Check room availability:</h5>
                    <div className={classes.Available}>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa" />

                        <Button type='green' style={{ marginLeft: '20px', padding: '7px 15px' }} click={() => this.checkAvailability()}>Check</Button>

                        {this.state.availableSchedule === null ? null : (this.state.availableSchedule === true ? <p>Room is <span style={{color: 'green'}}>avalilable</span> for this date.</p> : <p>Room is <span style={{color: 'red'}}>unavaliable</span> for this date.</p>)}
                    </div>

                </div>

                <div className={classes.Subheader}>
                    <h5 onClick={this.checkFirstAvailable}>Prvi slobodni termin za ovu salu je:</h5>
                </div>
                    <h5 style={{marginLeft: '50px'}}>{this.state.firstAvailable}</h5>
            </div>
        );
    }
}

export default RoomAppointments;