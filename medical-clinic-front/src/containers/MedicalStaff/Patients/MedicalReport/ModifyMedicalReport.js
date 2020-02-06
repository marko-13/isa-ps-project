import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import axios from '../../../../axios';

import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './MedicalReport.module.css';
import Button from '../../../../components/UI/Button/Button';
import SelectTableComponent from '../../../../components/UI/SelectTableComponent/SelectTableComponent';
import {withRouter} from 'react-router-dom';

class ModifyMedicalReport extends Component {
	state = {
		dataProps: null,
		id: null,
		examDescription: '',
		diagnosisRegistry: null,
		prescription: null,
		selectedDiagnosis: [],
		selectedDrugs: [],
		diagnosisRegistryAll: [],
		drugsRegistryAll: [],
		newMedicalReport: {
			examDescription: null,
			medicalReportID: null,
			selectedDrugs: [],
			selectedDiagnosis: [],
			examID: null
		},
		refresh: true,
		examID: null,
		editMedicalHistory: null,
		patientId: null
	}

	componentDidMount() {
		axios.get('/admin-clinic-center/diagnosis/get-all-diagnosis')
			.then(diagnosisRegistry => {
				this.setState({diagnosisRegistryAll: diagnosisRegistry.data})})
			.catch(err => console.log(err));

		axios.get('/admin-clinic-center/drugs/get-all-drugs')
			.then(drugsRegistry => {
				this.setState({drugsRegistryAll: drugsRegistry.data})})
			.catch(err => console.log(err));

		console.log(this.props);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if((nextProps.data !== prevState.dataProps) && nextProps.data !== null || (prevState.refresh && !nextProps.addNew)) {
			let selectedDiagnosisList = [];
			let selectedDrugsList = [];

			for (var i = 0; i < nextProps.data.diagnosisRegistry.length; i++) {
				selectedDiagnosisList.push('select-'+ nextProps.data.diagnosisRegistry[i].id);
			}

			for (var i = 0; i < nextProps.data.prescription.drugs.length; i++) {
				selectedDrugsList.push('select-'+ nextProps.data.prescription.drugs[i].id);
			}

			var newMedicalReport = {...prevState.newMedicalReport};
			newMedicalReport.medicalReportID = nextProps.data.id;
			newMedicalReport.examDescription = nextProps.data.examDescription;
			newMedicalReport.selectedDrugs = nextProps.data.selectedDrugs;
			newMedicalReport.selectedDiagnosis = nextProps.data.selectedDiagnosis;
			newMedicalReport.examID = null;

			return {
				dataProps: nextProps.data,
				id: nextProps.data.id,
				examDescription: nextProps.data.examDescription,
				diagnosisRegistry: nextProps.data.diagnosisRegistry,
				prescription: nextProps.data.prescription,
				selectedDiagnosis: selectedDiagnosisList,
				selectedDrugs: selectedDrugsList,
				newMedicalReport: newMedicalReport,
				refresh: false
			}
		} else if (((nextProps.examId !== prevState.examID) || (prevState.refresh && nextProps.addNew))) {
			var newMedicalReport = {...prevState.newMedicalReport};
			newMedicalReport.medicalReportID = null;
			newMedicalReport.examDescription = '';
			newMedicalReport.selectedDrugs = [];
			newMedicalReport.selectedDiagnosis = [];
			newMedicalReport.examID = nextProps.examId;
			return {
				dataProps: nextProps.data,
				id: null,
				examDescription: '',
				diagnosisRegistry: [],
				prescription: null,
				selectedDiagnosis: [],
				selectedDrugs: [],
				newMedicalReport: newMedicalReport,
				refresh: false,
				examID: nextProps.examId,
				editMedicalHistory: nextProps.editMedicalHistory,
				patientId: nextProps.patientId
			}
		}

		return null;
	}

	onSave = (event) => {
		event.preventDefault();
		console.log(this.state.newMedicalReport);
		if (this.props.addNew && this.props.editMedicalHistory === undefined) {
			axios.post('/medical-reports/add', this.state.newMedicalReport)
        	.then(rsp => {
                console.log(rsp);
                alert('Successfuly added medical report');
                window.location.reload();
                //this.props.back();
            })
            .catch(err => {
            	console.log(err);
            	alert('Unable to add medical report.\nReason: ' + err.response.data)
            	this.setState({refresh: true});
            	this.props.back();
            });
		} else if (this.props.addNew) {
			//Proveri ovde kada saljes ako nije nista u medical reportu da ne prijavljuje to kao add, nego kao null
            //let firstSuccess = false

            if (this.state.newMedicalReport.examDescription !== '' || this.state.newMedicalReport.selectedDiagnosis.length !== 0 || this.state.newMedicalReport.selectedDrugs.length !== 0) {
	            axios.post('/medical-reports/add', this.state.newMedicalReport)
	        	.then(rsp => {
	                console.log(rsp);
	                console.log(this.state.newMedicalReport);
	                //firstSuccess = true;
	                axios.post('/doctor/finish-exam/' + this.state.patientId, this.state.editMedicalHistory)
			        	.then(rsp => {
			                console.log(rsp);
							alert('Successfuly finished examination');
							//TU REDIREKTUJ
			                this.props.history.push({
            					pathname: '/homepage/doctor/add-another-appointment/' + this.state.examID,
            					search: ''
        					});
			            })
			            .catch(err => {
			            	console.log(err);
			            	alert('Unable to finish examination.\nReason: ' + err.response.data);
			            	this.setState({refresh: true});
			            	this.props.back();
			            });
	            })
	            .catch(err => {
	            	console.log(err);
	            	alert('Unable to add medical report.\nReason: ' + err.response.data);
	            	this.setState({refresh: true});
	            	this.props.back();
	            });
        	} else {
        		axios.post('/doctor/finish-exam/' + this.state.patientId, this.state.editMedicalHistory)
			        	.then(rsp => {
			                console.log(rsp);
							alert('Successfuly finished examination');
							//TU REDIREKTUJ

			                this.props.history.push({
            					pathname: '/homepage/doctor/add-another-appointment/' + this.state.examID,
            					search: ''
        					});
			            })
			            .catch(err => {
			            	console.log(err);
			            	alert('Unable to finish examination.\nReason: ' + err.response.data);
			            	this.setState({refresh: true});
			            	this.props.back();
			            });
        	}

		} else {
			axios.post('/medical-reports/modify', this.state.newMedicalReport)
	        	.then(rsp => {
	                console.log(rsp);
	                alert('Successfuly modified medical report');
	                window.location.reload();
	                //this.props.back();
	            })
	            .catch(err => {
	            	console.log(err);
	            	alert('Unable to modify medical report.\nReason: ' + err.response.data)
	            	this.setState({refresh: true});
	            	this.props.back();
	            });
        }
	} 

	onBack = (event) => {
		event.preventDefault();
		this.setState({refresh: true});
		this.props.back();
	}

	onChangeTextAreaHandler = (event) => {
		var newMedicalReport = {...this.state.newMedicalReport};
		newMedicalReport.examDescription = event.target.value;
		this.setState({newMedicalReport: newMedicalReport});
	}

	handlerSelectedDiagnosis = (event) => {
		var newMedicalReport = {...this.state.newMedicalReport};
		newMedicalReport.selectedDiagnosis = event;
		this.setState({newMedicalReport: newMedicalReport});
	}

	handlerSelectedDrugs = (event) => {
		var newMedicalReport = {...this.state.newMedicalReport};
		newMedicalReport.selectedDrugs = event;
		this.setState({newMedicalReport: newMedicalReport});
	}

	render () {
		let content = null;
		let displayButton = 'block';

		let columnsDiagnosis = [{
                    Header: 'Diagnosis',
                    columns: [
                    {
                        id: 'diagName',
                        Header: 'Diagnosis name',
                        accessor: d => d.diagnosisName}
                    ]
        }];

        let columnsDrugs = [{
                    Header: 'Drugs',
                    columns: [
                    {
                        id: 'drugName',
                        Header: 'Drug name',
                        accessor: d => d.drugName}
                    ]
        }];

		if (this.props.data !== undefined) {
			if(this.props.isStartExam) {
				displayButton = 'none';
			}

			content = (
				<Auxiliary>
					<div className={classes.Header}>
		                	<h3 style={{color: 'white'}}>Medical report</h3>
		            </div>
					<form onSubmit = {this.onSave} >
	                    <div className="form-group">
	                    	<label className = 'label' style={{fontWeight: 'bold'}}>Exam description</label>
	                        <textarea
	                        	className="form-control"
	                            value={this.state.newMedicalReport.examDescription}
	                            onChange={(event) => this.onChangeTextAreaHandler(event)}
	                        />
	                    </div>

	                    <div className="form-group">
			                <SelectTableComponent 
				                	data = {this.state.diagnosisRegistryAll} 
				                	columns = {columnsDiagnosis} 
				                	pageSize = {(this.state.diagnosisRegistryAll.length > 5) ? 5 : this.state.diagnosisRegistryAll.length} 
				                	filterable = {true} 
				                	defaultFilterMethod={(filter, row, column) => {
			                        const id = filter.pivotId || filter.id
			                        console.log(row[id]);
			                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
			                      }}
			                    keyField="id"
			                    selected = {this.state.selectedDiagnosis}
			                    handlerSelected = {this.handlerSelectedDiagnosis}/>
	                    </div>
	                    <div className="form-group">
			                <SelectTableComponent 
				                	data = {this.state.drugsRegistryAll} 
				                	columns = {columnsDrugs} 
				                	pageSize = {(this.state.drugsRegistryAll.length > 5) ? 5 : this.state.drugsRegistryAll.length} 
				                	filterable = {true} 
				                	defaultFilterMethod={(filter, row, column) => {
			                        const id = filter.pivotId || filter.id
			                        console.log(row[id]);
			                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
			                      }}
			                    keyField="id"
			                    selected = {this.state.selectedDrugs}
			                    handlerSelected = {this.handlerSelectedDrugs}
			                    />
	                    </div>
	                    <button className="btnSubmit" style={{width: '15%', float: 'right'}} type = "submit">Save</button>
	                    <button className="btnSubmit" onClick={this.onBack} style={{width: '15%', float: 'right', marginRight: '1%', display: displayButton}}>Back</button>
	                </form>
				</Auxiliary>
			);
		} else {
			content = (
				<Auxiliary>
					Nesto u novoj komponenti undefined
				</Auxiliary>
			);
		}

		return (
			<div> {content} </div>);
	}
}

export default withRouter(ModifyMedicalReport);