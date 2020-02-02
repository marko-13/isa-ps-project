import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import axios from '../../../../axios';

import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import ModifyMedicalReport from './ModifyMedicalReport.js';
import Modal from '../../../../components/UI/Modal/Modal';
import Button from '../../../../components/UI/Button/Button';
import classes from './MedicalReport.module.css';
import './MedicalReport.css';


class MedicalReport extends Component {
	state = {
		medicalReport: null,
		isModalOpen: false,
		hasAuthority: false,
		displayFirst: true,
		displaySecond: false,
	}

	componentDidMount() {
		if (localStorage.getItem('token') !== null) {
			const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const userId = decodedToken.userId;
            const userRole = decodedToken.role;

            if (userRole === "DOCTOR") {
            	this.setState({hasAuthority: true})
            }

            this.setState({medicalReport: this.props.medicalReport});
            console.log("POSLANO OD PROPSA");
            console.log(this.props.medicalReport);
		}
	}

	onClickShowEdit = () => {
		this.setState({displayFirst: false});
		this.setState({displaySecond: true});
		console.log("Kliknuo");
	}

	onClickBack = () => {
		this.setState({displayFirst: true});
		this.setState({displaySecond: false});
	}


    render() {
    	let content = null;
    	let buttonEdit = null;
    	let displayFirst = 'block';
    	let displaySecond = 'none';


    	if (this.state.displaySecond) {
    		displayFirst = 'none';
    		displaySecond = 'block';
    	}

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
                    Header: 'Prescription drugs',
                    columns: [
                    {
                        id: 'drugsName',
                        Header: 'Drugs name',
                        accessor: d => d.drugName}
                    ]
                }];
        let approved = '';

    	if (this.props.medicalReport !== undefined && this.props.medicalReport !== null) {
    		if (this.props.medicalReport.prescription.approved) {
    			approved = 'Approved';
    		} else {
    			if(this.props.medicalReport.prescription.drugs.length === 0) {
    				approved = 'No prescription';
    			} else {
    				approved = 'Not approved';
    			}
    		}

    		if (this.state.hasAuthority) {
    			buttonEdit = (
    				<Auxiliary>
    					<Button type = 'black' click = {() => this.onClickShowEdit()}>Edit</Button>
    				</Auxiliary>
    				);
    		} else {
    			buttonEdit = null;
    		}

    		content = (
    			<Auxiliary>
	    			<div style={{display: displayFirst}}>
		    			<div className={classes.Header}>
		                	<h3 style={{color: 'white'}}>Medical report # {this.props.medicalReport.id}</h3>
		                </div>
		    			<div className = "row">
		                    <div className="col-md-9 col-lg-9 ">
		                        <table className="table table-user-information">
		                            <tbody>
		                                <tr>
		                                    <td style={{fontWeight: 'bold'}}>Exam's description:</td>
		                                    <td>{this.props.medicalReport.examDescription}</td>
		                                </tr> 
		                                <tr>
		                                	<td style={{fontWeight: 'bold'}}>Prescription approval:</td>
		                                    <td style={{color: approved === 'Approved'? '#1abc9c' : 'salmon', fontWeight: 'bold'}}>{approved}</td>
		                                </tr>
		                                <tr>
		                                	<td></td>
		                                	<td></td>
		                                </tr>       
		                            </tbody>
		                        </table>
		                    </div>
		                    <div className="col-3">
		                        <div className="row" style={{textAlign: 'right', paddingRight: '15px', float: 'right'}}>
		                            <div style={{fontSize: '1.25em'}}>
		                                <Button type = 'black' click = {this.props.back}>Back</Button>
		                                {buttonEdit}
		                            </div>
		                        </div>
		                    </div>
		                </div>
		                <div className = "row">
		                	<div className="col-md-6">
			                	<ReactTable data = {this.props.medicalReport.diagnosisRegistry}
				                    pageSize={(this.props.medicalReport.diagnosisRegistry.length > 5) ? 5 : this.props.medicalReport.diagnosisRegistry.length}
				                    columns = {columnsDiagnosis}
				                    filterable = {true}
				                    defaultFilterMethod={(filter, row, column) => {
				                        const id = filter.pivotId || filter.id
				                        console.log(row[id]);
				                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
				                      }}/>
			                </div>
			                <div className="col-md-6">
			                	<ReactTable data = {this.props.medicalReport.prescription.drugs}
				                    pageSize={(this.props.medicalReport.prescription.drugs.length > 5) ? 5 : this.props.medicalReport.prescription.drugs.length}
				                    columns = {columnsDrugs}
				                    filterable = {true}
				                    defaultFilterMethod={(filter, row, column) => {
				                        const id = filter.pivotId || filter.id
				                        console.log(row[id]);
				                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
				                      }}/>
			                </div>
		                </div>
		            </div>
		            <div style={{display: displaySecond}}>
		            	<ModifyMedicalReport data = {this.props.medicalReport} back = {() => this.onClickBack()}/>
		            </div>
                </Auxiliary>
    			);
    	} else {
    		content = <h2>Loading...</h2>
    	}
    	return (
    		<div>{content}</div>);
    }
}

export default MedicalReport;