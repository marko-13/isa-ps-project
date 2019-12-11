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
                    })} />

            );
        }

        if (this.state.showRoomRedails !== false && this.state.appointments !== null) {

            roomDetails = <RoomAppointments 
                roomName={this.state.roomName}
                roomNumber={this.state.roomNumber}
                appointments={this.state.appointments}/>

            // roomDetails = (
            //     <div>
            //         <h3>{this.state.roomName} {this.state.roomNumber}</h3><br></br>
            //         <div style={{ padding: '10px' }}>
            //             <h5>Scheduled appointments for this room:</h5><br></br>
            //             {this.state.appointments.map((app, i) => {
            //                 return (
            //                     <p key={i}><strong>{i + 1}. </strong><strong>DATE: </strong>{moment(app.date).format("DD-MMM-YYYY hh:mm")}, <strong>DURATION:</strong> {app.duration}min, <strong>TYPE:</strong> {app.fastExam}</p>
            //                 );
            //             })}
            //         </div><br></br>

            //         <div style={{ padding: '10px' }}>
            //             <h5>First available appointment for this room is:</h5>
            //             <input type='date' style={{ marginRight: '15px' }} onChange={(event) => this.setState({ pickedDate: event.target.value })}></input>
            //             <Button type='green' click={() => this.checkAvailability()}>Check</Button>
            //             {this.state.availableSchedule === null ? null : (this.state.availableSchedule === true ? <p>Room is avalilable for this date</p> : <p>Room is unavaliable for this date</p>)}
            //         </div><br></br>

            //         <h5>Prvi slobodni termin za ovu salu je:</h5>


            //     </div>
            // );
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