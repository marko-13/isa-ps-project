import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import plus from '../../../../assets/images/plus.png';
import { withRouter } from "react-router";
import axios from '../../../../axios';

import "react-datepicker/dist/react-datepicker.css";
import classes from './RoomAppointments.module.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Button from '../../../../components/UI/Button/Button';
import Modal from '../../../../components/UI/Modal/Modal';

const localizer = momentLocalizer(moment)



class RoomAppointments extends Component {

    state = {
        startDate: new Date(),
        availableSchedule: null,
        firstAvailable: null,
        modalOpen: false
    }

    componentDidMount() {
        this.checkFirstAvailable();
    }

    handleChange = date => {
        this.setState({
            startDate: date,
        });
    };

    closeModalHandler = () => {
        this.setState({modalOpen: false});
    }

    onScheduleHandler = (app) => {
        if(this.props.changeDate){
            //POSALJI REQUEST I PROVERI DA LI DOKTOR OD APPOINTMENTA MOZE DA BUDE TU
            //AKO NE, OTVORI MODAL DA ADMIN BIRA KOGA HOCE
            //AKO DA, PROMENI DATUM PREGLEDU I ZAKAZI GA
            this.setState({modalOpen: true});
        }else{
            axios.post('/appointment/addRoomToAppointment/' + app.appId + '/' + this.props.roomId, null)
                .then(res => {
                    alert('Appointment has been scheduled!');
                    this.props.history.push('/homepage/admin-clinic');
                })
                .catch(err => console.log(err));
        }
    }

    checkFirstAvailable = () => {
        //PROVERI PRVI SLOBODAN
        const currentTime = moment().valueOf();

        if (this.props.appointments.length === 0) {
            this.setState({ firstAvailable: moment(currentTime).format("DD-MM-YYYY hh:mm") });
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
            if (app.patient === "No patient") {
                title = "Fast exam"
            }

            return {
                id: app.id,
                title: title,
                start: new Date(app.date),
                end: new Date(app.date + app.duration * 60000)
            }
        })

        let scheduleInfo = null;

        if (this.props.fromRequests) {

             const query = new URLSearchParams(this.props.location.search);

             let appDate = {
                 start: '',
                 appId: ''
             }

            for (let param of query.entries()) {
                appDate[param[0]] = param[1];
            }
            
            appDate.start = moment.unix(appDate.start/1000).format('YYYY-MM-DD hh:mm');

            scheduleInfo = (
                <div style={{ marginTop: '20px' }}>
                    Schedule room for this appointment. ({appDate.start})
                    <Button type='green' style={{ padding: '5px 15px', marginLeft: '20px' }} click={() => this.onScheduleHandler(appDate)}>Schedule</Button>
                </div>
            );
        } else {
            scheduleInfo = (
                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <h5 onClick={this.checkFirstAvailable}>First available appointment: </h5>
                    <h5 style={{ marginLeft: '50px' }}>{this.state.firstAvailable}</h5>
                    <div className={classes.Image} style={{ margin: '0px 15px' }}>
                    </div>
                </div>
            );
        }

        return (
            <div className={classes.Container}>

                <div className={classes.Header}>
                    <h3>{this.props.roomName} {this.props.roomNumber}</h3>
                </div>

                <div className={classes.Subheader}>
                    <Button style={{ float: 'right', marginBottom: '10px' }} type='black' click={() => this.props.back(null, false)}>Nazad</Button>

                </div>
                {scheduleInfo}

                <Calendar
                    localizer={localizer}
                    onSelectEvent={e => console.log(e)}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    scrollToTime={new Date(new Date().setHours(new Date().getHours()))}
                    style={{ height: 'calc(100vh - 100px)', width: '100%', marginTop: '5%' }}
                />

            <Modal modalClosed={this.closeModalHandler} show={this.state.modalOpen}>
                <h1>dsadsadsad</h1>
            </Modal>
            </div>
        );
    }
}

export default withRouter(RoomAppointments);