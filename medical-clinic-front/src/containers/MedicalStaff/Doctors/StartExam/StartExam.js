import React, { Component } from 'react';
import axios from '../../../../axios';
import Modal from '../../../../components/UI/Modal/Modal';
import Button from '../../../../components/UI/Button/Button';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import jwt from 'jsonwebtoken';
import {NavLink} from 'react-router-dom';
import ModifyMedicalReport from '../../Patients/MedicalReport/ModifyMedicalReport';

class StartExam extends Component {

	//Promeni data u null is isAllowed na false
	state = {
		data: null,
		isDoctor: false,
		isAllowed: false,
		isSecond: false,
		patientId: null,
		diagnosisRegistryAll: [],
		drugsRegistryAll: []
	}

	startExamination = () => {
		let number = parseInt(this.props.location.search.split("=")[1]);
		this.setState({patientId: number});
		console.log(number);
		axios.post('doctor/start-exam/' + number)
            .then(rsp => {
                this.setState({data: rsp.data});
                this.setState({isAllowed: rsp.data.isAllowed});
                console.log(rsp);
            })
            .catch(err => {
                this.setState({data: null})
                alert('Unable to added medical report.\nReason: ' + err.response.data)
                console.log(err);
            });

        axios.get('/admin-clinic-center/diagnosis/get-all-diagnosis')
	        .then(diagnosisRegistry => {
	            this.setState({diagnosisRegistryAll: diagnosisRegistry.data});
	        })
	        .catch(err => console.log(err));

        axios.get('/admin-clinic-center/drugs/get-all-drugs')
            .then(drugsRegistry => {
                this.setState({drugsRegistryAll: drugsRegistry.data})})
            .catch(err => console.log(err));

	}

	componentDidMount() {
		const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);
        let passChanged = decodedToken.passChanged;
        let role = decodedToken.role.toLowerCase();
        if(role === 'doctor'){
        	console.log("usao ovde u start exam");
        	this.startExamination();
        	this.setState({isDoctor: true});
        }
    }

    onHandlerNext = () => {
    	this.setState({isSecond: true});
    }

    onHandlerBack = () => {
    	this.setState({isSecond: false});
    }

    onChangeWeightHandler = (event) => {
		var newData = {...this.state.data};
		newData.weight = event.target.value;
		this.setState({data: newData});
	}

	onChangeHeightHandler = (event) => {
		var newData = {...this.state.data};
		newData.height = event.target.value;
		this.setState({data: newData});
	}

	onChangeDioptreHandler = (event) => {
		var newData = {...this.state.data};
		newData.dioptre = event.target.value;
		this.setState({data: newData});
	}

	onChangeAllergiesHandler = (event) => {
		var newData = {...this.state.data};
		newData.allergies = event.target.value;
		this.setState({data: newData});
	}

	render() {
		let content = null;
		let displayFirst = 'block';
		let displaySecond = 'none';
		if(this.state.isSecond) {
			displayFirst = 'none';
			displaySecond = 'block';
		}

		if(this.state.isDoctor) {
			if (this.state.data !== null) {
				if(!this.state.isAllowed) {
					content = (
						<Auxiliary>
							<div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
								<div className="row" style={{textAlign: 'left', paddingLeft: '15px', float: 'left'}}>
									<h3>Not authorized to start this examination.</h3>
									<br/>
									<NavLink to={'/homepage'}>
			                              <Button style={{padding: '7% 15px'}} type='black'>Back</Button>
			                        </NavLink>
			                    </div>
							</div>
						</Auxiliary>
					);
				} else {
					content = (
						<Auxiliary>
							<div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
								<div style={{display: displayFirst}}>
									<div style={{backgroundColor: '#1abc9c', padding: '5px 20px', color: 'white', marginBottom: '10px'}}>
						                	<h3 style={{color: 'white'}}>Edit medical history</h3><h5 style={{color: 'white'}}><center><i>{this.state.data.firstName} {this.state.data.lastName}</i></center></h5>
						            </div>
									<div className="form-group">
				                    	<label className = 'label' style={{fontWeight: 'bold'}}>Weight (kg)</label>
				                        <input
				                        	className="form-control"
				                        	type='number'
				                        	min='0'
				                        	value={this.state.data.weight}
				                        	onChange={(event) => this.onChangeWeightHandler(event)}
				                        />
				                    </div>
				                    <div className="form-group">
				                    	<label className = 'label' style={{fontWeight: 'bold'}}>Height (cm)</label>
				                        <input
				                        	className="form-control"
				                           	type='number'
				                           	min='0'
				                           	value={this.state.data.height}
				                           	onChange={(event) => this.onChangeHeightHandler(event)}
				                        />
				                    </div>
				                    <div className="form-group">
				                    	<label className = 'label' style={{fontWeight: 'bold'}}>Dioptre</label>
				                        <input
				                        	className="form-control"
				                            type='number'
				                            value={this.state.data.dioptre}
				                            onChange={(event) => this.onChangeDioptreHandler(event)}
				                        />
				                    </div>
				                    <div className="form-group">
				                    	<label className = 'label' style={{fontWeight: 'bold'}}>Allergies</label>
				                        <input
				                        	className="form-control"
				                            value={this.state.data.allergies}
				                            onChange={(event) => this.onChangeAllergiesHandler(event)}
				                        />
				                    </div>
				                    <NavLink to={'/homepage'}>
				                    	<Button type='black' style={{marginRight: '1%'}}>Back</Button>
				                    </NavLink>
				                    <Button type='black' click = {() => this.onHandlerNext()} style={{marginRight: '1%'}}>Next</Button>
								</div>
								<div style={{display: displaySecond}}>
									<ModifyMedicalReport data = {null} back = {() => this.onHandlerBack()} addNew = {true} examId = {this.state.data.examID} editMedicalHistory = {this.state.data} patientId = {this.state.patientId} isStartExam = {true} drugsRegistryAll = {this.state.drugsRegistryAll} diagnosisRegistryAll = {this.state.diagnosisRegistryAll}/>
								</div>
							</div>
						</Auxiliary>
					);
				}
			} else {
				if(!this.state.isAllowed) {
					content = (
						<Auxiliary>
							<div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
								<div className="row" style={{textAlign: 'left', paddingLeft: '15px', float: 'left'}}>
									<h3>Not authorized to start this examination.</h3>
									<br/>
									<NavLink to={'/homepage'}>
			                              <Button style={{padding: '7% 15px'}} type='black'>Back</Button>
			                        </NavLink>
			                    </div>
							</div>
						</Auxiliary>
					);
				} else {
					content = (
						<Auxiliary>
							<div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
								<h3>Loading...</h3>
							</div>
						</Auxiliary>
					);
				}
			}
		} else {
			content = (
				<Auxiliary>
					<div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
						<div className="row" style={{textAlign: 'left', paddingLeft: '15px', float: 'left'}}>
							<h3>Not authorized to start this examination. You are a nurse.</h3>
							<br/>
							<NavLink to={'/homepage/nurse/patients'}>
	                              <Button style={{padding: '7% 15px'}}type='black'>Back to the list</Button>
	                        </NavLink>
                        </div>
					</div>
				</Auxiliary>
				);
		}

		return(content);
	}
}
export default StartExam;