import React, { Component } from 'react';
import axios from '../../axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import './DiagnosisRegistry.css';
import Button from '../../components/UI/Button/Button';

class DiagnosisRegistry extends Component {
	
	state = {
		diagnosisRegistry : null,
		diagnosisName: ""
	}

	getDiagnosisRegistry = () => {
		axios.get('/admin-clinic-center/diagnosis/get-all-diagnosis', {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
			.then(diagnosisRegistry => this.setState({diagnosisRegistry: diagnosisRegistry}))
			.catch(err => console.log(err));
	}

	componentDidMount() {
        this.getDiagnosisRegistry();
    }

    addNewDiagnosis = () => {

    	const newDiagnosis = {
    		diagnosisName: this.state.diagnosisName
    	}

    	axios.post('/admin-clinic-center/diagnosis/add-new-diagnosis', newDiagnosis, {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
    		.then(rsp => {
    			let newDiagnosisRegistry = this.state.diagnosisRegistry;
    			newDiagnosisRegistry.data = [...newDiagnosisRegistry.data, rsp.data];

    			this.setState({
    				diagnosisRegistry: newDiagnosisRegistry
    			})
            })
            .catch(err => console.log(err));

        this.setState({
        	diagnosisName: ""
        })
    }

    render() {
    	if (this.state.diagnosisRegistry != null) {
    		const columns = [{
                Header: 'Diagnosis Registry',
                columns: [
                {
                    id: 'diagnosisName',
                    Header: 'Diagnosis name',
                    accessor: d => d.diagnosisName}
                ]
            }];

            return(
            	
	                <div className = 'react-custom-table' style = {{width: '100%'}}>
		                <div className = 'rowNew'>
			                <div className = 'columnNew'>
				                <ReactTable data = {this.state.diagnosisRegistry.data}
				                pageSize={(this.state.diagnosisRegistry.data.length > 10) ? 10 : this.state.diagnosisRegistry.data.length}
				                getTrProps={(state, rowInfo, column, instance) => ({
				                    onClick: e => console.log('A row was clicked!')
				                })}
				                columns = {columns}
				                filterable = {true}
				                defaultFilterMethod={(filter, row, column) => {
			                        const id = filter.pivotId || filter.id
			                        console.log(row[id]);
			                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
			                      }}/>
				            </div>

			                <div className = 'columnNew'>
			                	<div className="col-md-7 login-form-1" style={{margin: 'auto', paddingBottom: '10%'}}>
			                        <h3>Add new diagnosis</h3>
			                        <br/>
			                        <div className="form-group">
			                            <input
			                                type="text"
			                                className="form-control"
			                                placeholder="Name of diagnosis *"
			                                value={this.state.diagnosisName}
			                                onChange={(event) => this.setState({ diagnosisName: event.target.value })}
			                            />
			                        </div>
			                        <div className="form-group" style={{float: 'right', paddingRight: '2%'}}>
			                            <button className="btnSubmit" onClick = {this.addNewDiagnosis} style={{margin: '20%', width: '150%', padding: '20%'}}>Add</button>
			                        </div>
                        		</div>
			                </div>

			            </div>
	                </div>
            );
    	}

    	return (null);
    }
}
export default DiagnosisRegistry;