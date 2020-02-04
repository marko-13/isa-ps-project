import React, { Component } from 'react';

import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import selectTableHOC from "react-table-6/lib/hoc/selectTable";
import PropTypes from "prop-types";

const SelectTable = selectTableHOC(ReactTable);

class SelectTableComponent extends Component {
	static defaultProps = {
    	keyField: "id"
  	};

	static propTypes = {
    	keyField: PropTypes.string
  	};

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

	if (this.props.handlerSelected !== undefined) {
			var selectedId = []
			for (var i = 0; i < selection.length; i++) {
				var num = parseInt(selection[i].split("-")[1]);
				selectedId.push(num);
			}
			
			this.props.handlerSelected(selectedId);
		}
	};

	/**
	* Whether or not a row is selected for select table
	*/
	isSelected = key => {
		/*if (this.props.handlerSelected !== undefined) {
			var selectedId = []
			for (var i = 0; i < this.state.selection.length; i++) {
				var num = parseInt(this.state.selection[i].split("-")[1]);
				selectedId.push(num);
			}

			this.props.handlerSelected(selectedId);
		}*/
		return this.state.selection.includes(`select-${key}`);
	};

	state = {
	    selectAll: false,
	    selection: [],
	    selected: []
  	};

  	static getDerivedStateFromProps(nextProps, prevState) {
  		if (nextProps.selected !== undefined) {
				if(nextProps.selected !== prevState.selected) {
					return {
						selected: nextProps.selected,
						selection: nextProps.selected
					}
				}
		}

		return null;
	}

	render() {
		return (
		  <SelectTable
			    data = {this.props.data} 
            	columns = {this.props.columns} 
            	pageSize = {this.props.pageSize} 
            	filterable = {this.props.filterable}
            	defaultFilterMethod = {this.props.defaultFilterMethod}
			    keyField = {this.props.keyField}
			    ref={r => (this.checkboxTable = r)}
			    toggleSelection={this.toggleSelection}
			    selectAll={this.state.selectAll}
			    selectType="checkbox"
			    toggleAll={this.toggleAll}
			    isSelected={this.isSelected}
			    getTrProps={this.rowFn}
		  />
		);
	}
}

export default SelectTableComponent;