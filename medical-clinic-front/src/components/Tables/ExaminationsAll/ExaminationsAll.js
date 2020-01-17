import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';

import Button from '../../../components/UI/Button/Button';

class ExaminationsAll extends Component {

    state = {
        exams: null
    }

    componentDidMount() {

    }

    getAllExams = () => {
        
    }

    render() {

        let table = null;

        if (this.state.exams !== null) {
            if (this.state.exams.length === 0) {
                table = <h1>There are no medical exams in this clinic.</h1>
            }
            else {
                const columns = [{
                    Header: 'Requests for leave of absence',
                    columns: [
                        {
                            id: 'name',
                            Header: 'Name',
                            accessor: d => d.serviceType
                        },
                        {
                            id: 'price',
                            Header: 'Price',
                            accessor: d => d.price
                        },
                        {
                            Header: "",
                            Cell: ({ original }) => (
                                <center><Button type='black'>Edit</Button></center>),
                            filterable: false,
                            sortable: false
                        },
                        {
                            Header: "",
                            Cell: ({ original }) => (
                                <center><Button type='red'>Remove</Button></center>),
                            filterable: false,
                            sortable: false
                        }]
                }];

                table = (
                    <ReactTable
                        data={this.state.exams}
                        columns={columns}
                        className="-striped"
                        pageSize={7}
                        filterable={true}
                        style={{ width: '85vw' }}
                        defaultFilterMethod={(filter, row, column) => {
                            const id = filter.pivotId || filter.id
                            console.log(row[id]);
                            return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                        }}
                        pageSize={(this.state.exams.length > 7) ? 7 : this.state.exams.length}
                    />
                )
            }
        }else{
            table = <h1>Something is not right.</h1>
        }

        return table;
    }
}

export default ExaminationsAll;