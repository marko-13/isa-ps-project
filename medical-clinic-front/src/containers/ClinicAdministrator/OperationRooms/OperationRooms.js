import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import moment from 'moment';

import Button from '../../../components/UI/Button/Button';
import RoomAppointments from './RoomAppointments/RoomAppointments';

class OperationRooms extends Component {

    state = {
        operationRooms: null,
        roomId: null,
        showRoomRedails: false,
        appointments: null,
        roomName: null,
        roomNumber: null,
        pickedDate: null,
        availableSchedule: null
    }

    componentDidMount() {
        this.getOperationRooms();
    }

    getOperationRooms = () => {
        axios.get('/operationRoom/getAll')
            .then(rooms => {
                console.log(rooms);
                this.setState({ operationRooms: rooms.data })
            })
            .catch(err => console.log(err));
    }

    checkAvailability = () => {
        const pickedDate = moment(this.state.pickedDate).valueOf();

        this.state.appointments.map(app => {
            if (app.date > pickedDate && app.date < (pickedDate + (60 * 60000))) {
                this.setState({ availableSchedule: false });
            } else {
                this.setState({ availableSchedule: true }); 
            }
        })

    }



    render() {

        console.log(this.state.availableSchedule);

        let table = null;
        let roomDetails = null;

        if (this.state.operationRooms !== null) {
            const data = this.state.operationRooms;

            const columns = [{
                Header: 'Operation rooms',
                columns: [
                    {
                        id: 'name',
                        Header: 'Name',
                        accessor: d => d.name
                    },
                    {
                        id: 'number',
                        Header: 'Number',
                        accessor: d => d.number
                    },
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button type='green'>Show schedule</Button></center>),
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
                    getTrProps={(state, rowInfo, column, instance) => ({
                        onClick: e => {

                            this.setState({ roomId: rowInfo.original.roomId, showRoomRedails: true });
                            axios.get("/appointment/getAllByOperationRoom/" + rowInfo.original.roomId)
                                .then(app => {
                                    this.setState({ appointments: app.data, roomName: rowInfo.original.name, roomNumber: rowInfo.original.number });
                                    console.log(app);
                                })
                                .catch(err => console.log(err));

                            this.setState({availableSchedule: null});

                        }
                    })}
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id
                        console.log(row[id]);
                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                      }}
                    />

            );
        }

        if (this.state.showRoomRedails !== false && this.state.appointments !== null) {

            roomDetails = <RoomAppointments 
                roomName={this.state.roomName}
                roomNumber={this.state.roomNumber}
                appointments={this.state.appointments}/>
        }

        return (
            <Auxiliary>
                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad'>
                    {table}
                </div>
                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad'>
                    {roomDetails}
                </div>
            </Auxiliary>

        );
    }
}

export default OperationRooms;