import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import moment from 'moment';

import Button from '../../../components/UI/Button/Button';
import RoomAppointments from './RoomAppointments/RoomAppointments';
import Modal from '../../../components/UI/Modal/Modal';
import plusimg from '../../../assets/images/plus.png';
import classes from './OperationRooms.module.css';

class OperationRooms extends Component {

    state = {
        operationRooms: null,
        roomId: null,
        showRoomRedails: false,
        appointments: null,
        roomName: null,
        roomNumber: null,
        pickedDate: null,
        availableSchedule: null,
        modalOpen: false
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

    closeModalHandler = () => {
        this.setState({ modalOpen: false });
    }

    showScheduleHandler = (operationRoom) => {

        this.setState({ roomId: operationRoom.roomId, showRoomRedails: true });
        axios.get("/appointment/getAllByOperationRoom/" + operationRoom.roomId)
            .then(app => {
                this.setState({ appointments: app.data, roomName: operationRoom.name, roomNumber: operationRoom.number });
            })
            .catch(err => console.log(err));

        this.setState({ availableSchedule: null });
    }

    editRoomHandler = (operationRoom) => {

        console.log(operationRoom);

    }

    removeRoomHandler = (opertaionRoom) => {

    }



    render() {
        let table = null;
        let roomDetails = null;

        if (this.state.operationRooms !== null) {
            const data = this.state.operationRooms;

            const columns = [{
                Header: (
                    <div>
                        <div><span>List of all rooms</span></div>
                    </div>
                ),
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
                            <center><Button type='green' click={() => this.showScheduleHandler(original)}>Schedule</Button></center>),
                        filterable: false,
                        sortable: false
                    },
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button type='black' click={() => this.editRoomHandler(original)}>Edit</Button></center>),
                        filterable: false,
                        sortable: false
                    },
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button type='red' click={() => this.removeRoomHandler(original)}>Remove</Button></center>),
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
                appointments={this.state.appointments} />
        }

        return (
            <Auxiliary>
                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad'>
                    <div style={{display: 'flex'}}>
                        <h4>Add new room</h4>
                        <div style={{margin: '0px 10px'}} onClick={() => this.editRoomHandler(null)}><img src={plusimg} className={classes.Image}/></div>
                    </div>
                    {table}
                </div>
                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad'>
                    {roomDetails}
                </div>
                <Modal show={this.state.modalOpen} modalClosed={this.closeModalHandler}>
                    <h1>dsadsad</h1>
                </Modal>
            </Auxiliary>
        );
    }
}

export default OperationRooms;