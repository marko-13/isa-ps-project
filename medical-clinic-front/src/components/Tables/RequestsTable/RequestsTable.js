import React, { Component } from 'react';
import classes from './RequestTable.module.css';
import axios from '../../../axios';

import { withRouter } from "react-router";
import Button from '../../../components/UI/Button/Button';
import ReactTable from 'react-table-6';
import OperationRooms from '../../../containers/ClinicAdministrator/OperationRooms/OperationRooms';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import moment from 'moment';

class RequestsTable extends Component {

    state = {
        requests: null,
        showRooms: false,
    }

    componentDidMount() {
        this.getAllRequests();
    }

    getAllRequests = () => {
        axios.get('/appointment/getAllAppointmentRequests')
            .then(res => {
                this.setState({ requests: res.data });
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                this.setState({ requests: -1 })
            });
    }

    onClickHandler = (app) => {
        const queryParams = [];
        queryParams.push(encodeURIComponent('start') + '=' + encodeURIComponent(app.date));
        queryParams.push(encodeURIComponent('appId') + '=' + encodeURIComponent(app.id));
        queryParams.push(encodeURIComponent('type') + '=' + encodeURIComponent(app.type));
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: this.props.match.path,
            search: '?' + queryString
        });

        this.setState({ showRooms: true });
    }

    showRoomHandler = (bool) => {
        this.setState({showRooms: bool});
    }

    render() {

        let table = null;

        if (this.state.requests === null) {
            table = <h1>Loading...</h1>
        } else if (this.state.requests === -1) {
            table = <h1>Error</h1>
        } else if (this.state.requests.length === 0) {
            table = <h1>There are no appointments</h1>
        } else {

            const data = this.state.requests;

            const columns = [{
                Header: (
                    <div>
                        <div><span>List of all appointment requests</span></div>
                    </div>
                ),
                columns: [
                    {
                        id: 'type',
                        Header: 'Type',
                        accessor: d => d.type,
                        width: 75
                    },
                    {
                        id: 'date',
                        Header: 'Date',
                        accessor: d => moment(d.date).format("YYYY-MM-DD hh:mm")
                    },
                    {
                        id: 'regular',
                        Header: 'Regular',
                        accessor: d => d.fastExam,
                        width: 100
                    },
                    {
                        id: 'service',
                        Header: 'Service',
                        accessor: d => d.service
                    },
                    {
                        id: 'patient',
                        Header: 'Patient',
                        accessor: d => d.patient
                    },
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button id={"search_room_btn_" + original.id} type='green' click={() => this.onClickHandler(original)}>Search room</Button></center>),
                        filterable: false,
                        sortable: false
                    }]
            }];


            table = (
                <ReactTable
                    data={data}
                    columns={columns}
                    className="-striped -highlight"
                    pageSize={10}
                    filterable={true}
                    pageSize={(this.state.requests.length > 5) ? 5 : this.state.requests.length}
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id
                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                    }}
                />
            );

        }

        return (
            <Auxiliary>
                <div className={classes.Table + ' col-7 login-form-1'} hidden={this.state.showRooms}>
                    {table}
                </div>
                <div style={{margin: '0px', width: '100%'}} hidden={!this.state.showRooms}>
                    {this.state.showRooms ? <OperationRooms  fromRequests show={this.showRoomHandler}/> : null}
                </div>
            </Auxiliary>
        );
    }
}

export default withRouter(RequestsTable);