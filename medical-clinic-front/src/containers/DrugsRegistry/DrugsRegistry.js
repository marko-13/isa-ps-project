import React, { Component } from 'react';
import axios from '../../axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Button from '../../components/UI/Button/Button';

import classes from './DrugsRegistry.module.css';

class DrugsRegistry extends Component {
	state = {
		drugsRegistry : null,
		drugName : ""
	}

	getDrugsRegistry = () => {
		axios.get('/admin-clinic-center/drugs/get-all-drugs', {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
			.then(drugsRegistry => this.setState({drugsRegistry: drugsRegistry}))
			.catch(err => console.log(err));
	}

	componentDidMount() {
        this.getDrugsRegistry();
    }

    addNewDrug = (event) => {
    	event.preventDefault();

    	const newDrug = {
    		drugName: this.state.drugName
    	}

    	axios.post('/admin-clinic-center/drugs/add-new-drug', newDrug, {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
    		.then(rsp => {
    			let newDrugsRegistry = this.state.drugsRegistry;
    			newDrugsRegistry.data = [...newDrugsRegistry.data, rsp.data];

    			this.setState({
    				drugsRegistry: newDrugsRegistry
    			});

    			alert('Successfully added drug with name: \n' + rsp.data.drugName);
            })
            .catch(err => alert('Unable to add new drug.\nReason: ' + err.response.data));

        this.setState({
        	drugName: ""
        })
    }

    render() {
    	if (this.state.drugsRegistry != null) {
    		const columns = [{
                Header: 'Drugs Registry',
                columns: [
                {
                    id: 'drugName',
                    Header: 'Drug name',
                    accessor: d => d.drugName}
                ]
            }];

            return(
            	
	                <div className = 'react-custom-table' style = {{width: '100%'}}>
		                <div className = {classes.RowNew}>
			                <div className = {classes.ColumnNew}>
				                <ReactTable data = {this.state.drugsRegistry.data}
				                pageSize={(this.state.drugsRegistry.data.length > 10) ? 10 : this.state.drugsRegistry.data.length}
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

			                <div className = {classes.ColumnNew}>
			                	<div className="col-md-7 login-form-1" style={{margin: 'auto', paddingBottom: '10%'}}>
			                        <h3>Add new drug</h3>
			                        <br/>
			                        <form onSubmit = {this.addNewDrug}>
				                        <div className="form-group">
				                            <input
				                                type="text"
				                                className="form-control"
				                                placeholder="Name of drug *"
				                                value={this.state.drugName}
				                                onChange={(event) => this.setState({ drugName: event.target.value })}
				                                required
				                            />
				                        </div>

				                        <button className="btnSubmit" style={{width: '15%', float: 'right'}} type = "submit">Add</button>
                        			</form>
                        		</div>
			                </div>

			            </div>
	                </div>
            );
    	}

    	return (null);
    }
}
export default DrugsRegistry;