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
import ChooseAvailableDoctorsForm from '../../../../components/Forms/ChooseAvailableDoctorsForm/ChooseAvailableDoctorsForm';

import SelectTableComponent from '../../../../components/UI/SelectTableComponent/SelectTableComponent';

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
        this.setState({ modalOpen: false });
    }

    onScheduleHandler = (app) => {
        if (this.props.changeDate) {

            const query = new URLSearchParams(this.props.location.search);

            let exam = {
                start: '',
                appId: '',
                roomId: this.props.roomId
            };

            for (let param of query.entries()) {
                exam[param[0]] = param[1];
            }

            axios.post('/appointment/changeDateAndAddRoomToApointment', exam)
                .then(res => {
                    alert('Room has been added to appointment!');
                    this.props.history.push('/homepage/admin-clinic');
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        this.setState({ modalOpen: true });
                    } else {
                        console.log(err);
                    }
                });

        } else {
            axios.post('/appointment/addRoomToAppointment/' + app.appId + '/' + this.props.roomId, null)
                .then(res => {
                    alert('Appointment has been scheduled!');
                    this.props.history.push('/homepage/admin-clinic');
                })
                .catch(err => console.log(err.response));
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

        let appDate = null;

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

            appDate = {
                start: '',
                appId: ''
            }

            for (let param of query.entries()) {
                appDate[param[0]] = param[1];
            }

            const displayDate = moment.unix(appDate.start / 1000).format('YYYY-MM-DD hh:mm');

            scheduleInfo = (
                <div style={{ marginTop: '20px' }}>
                    Schedule room for this appointment. ({displayDate})
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
                    <ChooseAvailableDoctorsForm 
                        roomId={this.props.roomId} 
                        appId={appDate.appId} 
                        start={appDate.start} 
                        closeModal={this.closeModalHandler} />
                </Modal>
            </div>
        );
    }
}

export default withRouter(RoomAppointments);