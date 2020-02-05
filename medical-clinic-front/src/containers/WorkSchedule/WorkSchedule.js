import React, { Component } from 'react';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import {withRouter} from 'react-router';

const localizer = momentLocalizer(moment);


class WorkSchedule extends Component {

	state = {
		isModalOpen: false,
		appointments: '',
		events: [],
		data: []
	}

	getWorkSchedule = () => {
		axios.post('/nurse/get-work-schedule')
        	.then(rsp => {
                this.setState({appointments: rsp});
            })
            .catch(err => {
            	this.setState({appointments: []});
            	alert('Unable to retrieve work schedule.\nReason: ' + err.response.data);
            }
        );
	}

	componentDidMount() {
        this.getWorkSchedule();
    }

	closeModal = () => {
    	this.setState({isModalOpen : false});
    }

    onCloseHandler = (event) => {
        event.preventDefault();
        this.closeModal();
    }

    onStartExamHandler = () => {
    	const queryParams = [];
        queryParams.push(encodeURIComponent('patientId') + '=' + encodeURIComponent(this.state.data.patientId));
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/homepage/start-exam',
            search: '?' + queryString
        });
    }

	render() {
		let displayButton = 'none';
		const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);
        let passChanged = decodedToken.passChanged;
        let role = decodedToken.role.toLowerCase();

		if (this.state.appointments.data !== undefined) {
			let events = this.state.appointments.data.map(app => {
		            let title = app.patient;
		            if(app.patient === "No patient"){
		                title = "Fast exam"
		            }

		            return {
		                id: app.id,
		                title: title,
		                start: new Date(app.date),
		                end: new Date(app.date + app.duration * 60000),
		                type: app.type,
		                duration: app.duration,
		                service: app.service,
		                operationRoom: app.operationRoom
		            }
			        console.log("Usao")
		    });
		    console.log(events)
	    	return(
	    		<div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%', height: 'calc(100vh - 100px)', width: '100%'}}>
	    			<Calendar
			            localizer={localizer}
			            onSelectEvent={e => {
			            	this.setState({isModalOpen : true});
			            	this.setState({data : e});
			            }}
			            events={events}
			            startAccessor="start"
			            endAccessor="end"
			            scrollToTime={new Date(new Date().setHours(new Date().getHours()))}
			          />

			          <Modal show = {this.state.isModalOpen} modalClosed = {this.closeModal}>
			            	<h4>Information</h4>
			            	<div style={{fontWeight: 'bold'}}>Patient's name:</div><div>{this.state.data.title}</div>
		            		<br/>
		            		<div style={{fontWeight: 'bold'}}>Type:</div><div>{this.state.data.type}</div>
			            	<br/>
			            	<div style={{fontWeight: 'bold'}}>Start date:</div><div>{moment(this.state.data.start).format('DD. MMM YYYY HH:mm') + "h"}</div>
			            	<br/>
			            	<div style={{fontWeight: 'bold'}}>Duration:</div><div>{this.state.data.duration} min</div>
			            	<br/>
			            	<div style={{fontWeight: 'bold'}}>Service:</div><div>{this.state.data.service}</div>
			            	<br/>
			            	<div style={{fontWeight: 'bold'}}>Room:</div><div>{this.state.data.operationRoom}</div>
			            	<br/>
		            		<div style={{float: 'right'}}>
			                    <Button style={{ margin: '0px 5px' }} type='green' click={this.onCloseHandler}>Close</Button>
			               	</div>
			            </Modal>
	    		</div>
	    	);
    	}

    	return (null);
    }
}
export default WorkSchedule;