import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';
import moment from 'moment';

import Button from '../../../components/UI/Button/Button';
import classes from './Leaves.module.css';



class Leaves extends Component {

    state = {
        users: null
    }

    componentDidMount() {
        this.getLeaves();
    }

    getLeaves = () => {
        axios.get('/leave/getAll')
            .then(leaves => this.setState({ users: leaves.data }))
            .catch(err => console.log(err));
    }


    render() {

       // console.log(moment.unix(1589148000000));
       //var day = moment.unix(1198908717056-0700);

       //console.log(day);

        let table = null;

        if (this.state.users !== null) {
            const data = this.state.users;

            const columns = [{
                Header: 'Requests for leave of absence',
                columns: [
                    {
                        id: 'name',
                        Header: 'Name',
                        accessor: d => d.name
                    },
                    {
                        id: 'lastname',
                        Header: 'Lastname',
                        accessor: d => d.lastname
                    },
                    {
                        id: 'email',
                        Header: 'Email',
                        accessor: d => d.email
                    },
                    {
                        id: 'date_start',
                        Header: 'Start',
                        accessor: d => {
                            return moment(d.start).format("DD-MMM-YYYY");
                        }
                    },
                    {
                        id: 'date_end',
                        Header: 'End',
                        accessor: d => {
                            return moment(d.end).format("DD-MMM-YYYY");
                        }
                    },
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button type='green'>Approve</Button></center>),
                        filterable: false,
                        sortable: false
                    },
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button type='green'>Deny</Button></center>),
                        filterable: false,
                        sortable: false
                    }]
            }];

            table = (
                <div className={classes.Position}>
                    <ReactTable
                        className={classes.Table}
                        data={data}
                        columns={columns}
                        className="-striped"
                        pageSize={10}
                        filterable={true}
                        style={{width: '85vw'}}
                    />
                </div>
            );
        }

        return table;
    }
}

export default Leaves;