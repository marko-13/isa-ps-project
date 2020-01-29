import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import plus from '../../../../assets/images/plus.png';

import "react-datepicker/dist/react-datepicker.css";
import classes from './RoomAppointments.module.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Button from '../../../../components/UI/Button/Button';

const localizer = momentLocalizer(moment)



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

    checkFirstAvailable = () => {
        //PROVERI PRVI SLOBODAN
        const currentTime = moment().valueOf();

        if(this.props.appointments.length === 0){
            this.setState({firstAvailable: moment(currentTime).format("DD-MM-YYYY hh:mm")});
            return;
        }

        this.props.appointments.map(app => {
            if (!(currentTime >= app.date && (currentTime <= app.date + (app.duration * 60000)))) {
                this.setState({ firstAvailable: moment(currentTime).format("DD-MM-YYYY hh:mm") })
            } else {
                this.setState({ firstAvailable: moment(app.date + (app.duration * 60000).format("DD-MMM-YYYY hh:mm")) })
            }
        });

    }

    render() {

         let events = this.props.appointments.map(app => {

            let title = app.patient;
            if(app.patient === "No patient"){
                title = "Fast exam"
            }

             return {
                id: app.id,
                title: title,
                start: new Date(app.date),
                end: new Date(app.date + app.duration * 60000)
             }
         })

        return (
            <div className={classes.Container}>

                <div className={classes.Header}>
                    <h3>{this.props.roomName} {this.props.roomNumber}</h3>
                </div>

                <div className={classes.Subheader}>
                    <Button style={{ float: 'right', marginBottom: '10px' }} type='black' click={() => this.props.back(null, false)}>Nazad</Button>
                    <h5 onClick={this.checkFirstAvailable}>First available appointment: </h5>


                </div>
                <div style={{ display: 'flex' }}>
                    <h5 style={{ marginLeft: '50px' }}>{this.state.firstAvailable}</h5>
                    <div className={classes.Image} style={{ margin: '0px 15px' }}>
                        <img src={plus} alt="Zakazi pregled image" height="24px" width="auto" />
                    </div>
                </div>

                <Calendar
                    localizer={localizer}
                    onSelectEvent={e => console.log(e)}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    scrollToTime={new Date(new Date().setHours(new Date().getHours()))}
                    style={{ height: 'calc(100vh - 100px)', width: '100%', marginTop: '5%' }}
                />


            </div>
        );
    }
}

export default RoomAppointments;