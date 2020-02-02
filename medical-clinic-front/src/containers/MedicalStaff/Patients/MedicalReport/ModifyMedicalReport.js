import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import axios from '../../../../axios';

import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './MedicalReport.module.css';
import Button from '../../../../components/UI/Button/Button';
import selectTableHOC from "react-table-6/lib/hoc/selectTable";
import PropTypes from "prop-types";

const SelectTable = selectTableHOC(ReactTable);

class ModifyMedicalReport extends Component {
	state = {
		dataProps: null,
		id: null,
		examDescription: null,
		diagnosisRegistry: null,
		prescription: null,
		selectAll: false,
    	selection: []
	}

	toggleAll = () => {
	    const { keyField } = this.props;
	    const selectAll = !this.state.selectAll;
	    const selection = [];

	    if (selectAll) {
	      // we need to get at the internals of ReactTable
	      const wrappedInstance = this.checkboxTable.getWrappedInstance();
	      // the 'sortedData' property contains the currently accessible records based on the filter and sort
	      const currentRecords = wrappedInstance.getResolvedState().sortedData;
	      // we just push all the IDs onto the selection array
	      currentRecords.forEach(item => {
	        selection.push(`select-${item._original[keyField]}`);
	      });
	    }
	    this.setState({ selectAll, selection });
	  };

	rowFn = (state, rowInfo, column, instance) => {
	    const { selection } = this.state;

	    return {
	      onClick: (e, handleOriginal) => {
	        console.log("It was in this row:", rowInfo);

	        // IMPORTANT! React-Table uses onClick internally to trigger
	        // events like expanding SubComponents and pivots.
	        // By default a custom 'onClick' handler will override this functionality.
	        // If you want to fire the original onClick handler, call the
	        // 'handleOriginal' function.
	        if (handleOriginal) {
	          handleOriginal();
	        }
	      },
	      style: {
	        background:
	          rowInfo &&
	          selection.includes(`select-${rowInfo.original.id}`) &&
	          "#a3e4d7"
	      }
	    };
	  };

	/**
	* Toggle a single checkbox for select table
	*/
	toggleSelection = (key, shift, row) => {
	// start off with the existing state
	let selection = [...this.state.selection];
	const keyIndex = selection.indexOf(key);

	// check to see if the key exists
	if (keyIndex >= 0) {
	  // it does exist so we will remove it using destructing
	  selection = [
	    ...selection.slice(0, keyIndex),
	    ...selection.slice(keyIndex + 1)
	  ];
	} else {
	  // it does not exist so add it
	  selection.push(key);
	}
	// update the state
	this.setState({ selection });
	};

	/**
	* Whether or not a row is selected for select table
	*/
	isSelected = key => {
	return this.state.selection.includes(`select-${key}`);
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.data !== prevState.dataProps) {
			return {
				dataProps: nextProps.data,
				id: nextProps.data.id,
				examDescription: nextProps.data.examDescription,
				diagnosisRegistry: nextProps.data.diagnosisRegistry,
				prescription: nextProps.data.prescription
			}
		}

		return null;
	}

	onSave = (event) => {
		event.preventDefault();
		console.log(this.state.examDescription);
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

		if (this.props.data !== undefined) {
			content = (
				<Auxiliary>
					<div className={classes.Header}>
		                	<h3 style={{color: 'white'}}>Modify medical report</h3>
		            </div>
					<form onSubmit = {this.onSave} >
	                    <div className="form-group">
	                    	<label className = 'label' style={{fontWeight: 'bold'}}>Exam description</label>
	                        <textarea
	                        	className="form-control"
	                            value={this.state.examDescription}
	                            onChange={(event) => this.setState({ examDescription: event.target.value })}
	                            required
	                        />
	                    </div>

	                    <div className="form-group">
	                    	<ReactTable data = {this.state.diagnosisRegistry}
			                    pageSize={(this.state.diagnosisRegistry.length > 5) ? 5 : this.state.diagnosisRegistry.length}
			                    columns = {columnsDiagnosis}
			                    filterable = {true}
			                    defaultFilterMethod={(filter, row, column) => {
			                        const id = filter.pivotId || filter.id
			                        console.log(row[id]);
			                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
			                      }}/>
			                <SelectTable data = {this.state.diagnosisRegistry}
			                	pageSize={(this.state.diagnosisRegistry.length > 5) ? 5 : this.state.diagnosisRegistry.length}
			                	columns = {columnsDiagnosis}
			                	keyField="id" 
			                	selectType="checkbox"
			                	isSelected={this.isSelected}
			                	toggleSelection={this.toggleSelection}
			                	getTrProps={this.rowFn}
			                	toggleAll={this.toggleAll}
			                	selectAll={this.state.selectAll}
			                	ref={r => (this.checkboxTable = r)}
			                />
	                    </div>
	                    <button className="btnSubmit" style={{width: '15%', float: 'right'}} type = "submit">Save</button>
	                    <button className="btnSubmit" onClick={this.props.back} style={{width: '15%', float: 'right', marginRight: '1%'}}>Back</button>
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

export default ModifyMedicalReport;