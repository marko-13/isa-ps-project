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
		examID: null
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
				examID: nextProps.examId
			}
		}

		return null;
	}

	onSave = (event) => {
		event.preventDefault();
		console.log(this.state.newMedicalReport);
		if (this.props.addNew) {
			axios.post('/medical-reports/add', this.state.newMedicalReport)
        	.then(rsp => {
                console.log(rsp);
                alert('Successfuly added medical report');
                window.location.reload();
                //this.props.back();
            })
            .catch(err => {
            	console.log(err);
            	alert('Unable to added medical report.\nReason: ' + err.response.data)
            	this.setState({refresh: true});
            	this.props.back();
            });
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
	                    <button className="btnSubmit" onClick={this.onBack} style={{width: '15%', float: 'right', marginRight: '1%'}}>Back</button>
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