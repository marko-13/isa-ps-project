import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router";

import Button from '../../../components/UI/Button/Button';
import RoomAppointments from './RoomAppointments/RoomAppointments';
import Modal from '../../../components/UI/Modal/Modal';
import plusimg from '../../../assets/images/plus.png';
import classes from './OperationRooms.module.css';
import OperationRoomForm from '../../../components/Forms/OperationRoomForm/OperationRoomForm';
import DatePicker from "react-datepicker";

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
        modalOpen: false,
        room: {
            name: '',
            number: ''
        },
        addForm: false,
        startDate: null,
        changeDate: false
    }

    componentDidMount() {
        if (this.props.fromRequests) {
            this.getOperationRoomsForAppointment();
        } else {
            this.getOperationRooms();
        }

    }

    getOperationRoomsForAppointment = () => {

        this.setState({ operationRooms: [] })

        const query = new URLSearchParams(this.props.location.search);

        let exam = {
            start: '',
            appId: '',
            type: ''
        }
        for (let param of query.entries()) {
            exam[param[0]] = param[1];
        }

        axios.post("/operationRoom/getAllAvailable", exam)
            .then(res => {
                let data = [];
                for(var i = 0; i < res.data.length; i++) {
                    if(exam.type === 'EX') {
                        if(res.data[i].name === 'Ordinacija') {
                            data.push(res.data[i]);
                        }
                    } else {
                        if(res.data[i].name === 'Operaciona sala') {
                            data.push(res.data[i]);
                        }
                    }
                }
                this.setState({ operationRooms: data });
            })
            .catch(err => {
                this.setState({ operationRooms: [] });
                console.log(err);
            });
    }

    getOperationRooms = () => {
        axios.get('/operationRoom/getAll')
            .then(rooms => {
                this.setState({ operationRooms: rooms.data })
            })
            .catch(err => console.log(err));
    }

    handleChange = date => {
        this.setState({
            startDate: date,
        });
    };

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
        this.setState({
            modalOpen: false,
            room: {
                name: '',
                number: ''
            }
        });
    }

    openModalHandler = () => {
        this.setState({ modalOpen: true });
    }

    showScheduleHandler = (operationRoom) => {

        this.setState({ roomId: operationRoom.roomId });
        axios.get("/appointment/getAllByOperationRoom/" + operationRoom.roomId)
            .then(app => {
                this.setState({ appointments: app.data, roomName: operationRoom.name, roomNumber: operationRoom.number, showRoomRedails: true, addForm: false });
            })
            .catch(err => {
                this.setState({ showRoomRedails: false, addForm: false });
                alert('Unable to schedule. \nREASON: ' + err.response.data);
            });

        this.setState({ availableSchedule: null });
    }

    editRoomHandler = (operationRoom) => {
        this.setState({ room: operationRoom, modalOpen: true });
    }

    removeRoomHandler = (operationRoom) => {
        axios.post('/operationRoom/delete/' + operationRoom.roomId, null)
            .then(response => {
                let rooms = [...this.state.operationRooms];

                const index = this.state.operationRooms.indexOf(operationRoom);
                if (index > -1) {
                    rooms.splice(index, 1);
                }

                this.setState({ operationRooms: rooms });
            })
            .catch(err => alert('Unable to remove room.\nReason: ' + err.response.data));
    }

    pushNewRoom = (newRoom) => {
        let rooms = [...this.state.operationRooms];
        rooms.push(newRoom);
        this.setState({ operationRooms: rooms });
    }

    replaceRoom = (newRoom) => {
        let rooms = [...this.state.operationRooms];

        rooms.map(el => {
            if (el.roomId === newRoom.roomId) {
                el.name = newRoom.name;
                el.number = newRoom.number;
            }
            return el;
        })

        this.setState({ operationRooms: rooms });

    }

    showHideHandler = (boolean) => {
        this.setState({ showRoomRedails: boolean, addForm: false });
    }

    onSearchHandler = () => {
        const date = new Date(this.state.startDate);
        const milisecs = {
            start: date.getTime()
        };

        const query = new URLSearchParams(this.props.location.search);

        let exam = {
            start: '',
            appId: '',
            type: ''
        };

        for (let param of query.entries()) {
            exam[param[0]] = param[1];
        }


        axios.post("/operationRoom/getAllAvailable", milisecs)
            .then(res => {
                let data = [];
                for(var i = 0; i < res.data.length; i++) {
                    if(exam.type === 'EX') {
                        if(res.data[i].name === 'Ordinacija') {
                            data.push(res.data[i]);
                        }
                    } else if(exam.type === 'OP') {
                        if(res.data[i].name === 'Operaciona sala') {
                            data.push(res.data[i]);
                        }
                    }else if(exam.type === ''){
                        console.log(res.data);
                        data.push(res.data[i]);
                    }
                }
                this.setState({ operationRooms: data });
            })
            .catch(err => {
                this.setState({ operationRooms: [] });
                console.log(err);
            });
    }

    onSearchHandlerFromRequest = () => {
        this.setState({changeDate: true})
        const date = new Date(this.state.startDate);
        const milisecs = {
            start: date.getTime()
        };

        const query = new URLSearchParams(this.props.location.search);

        let exam = {
            start: '',
            appId: '',
            type: ''
        };

        for (let param of query.entries()) {
            exam[param[0]] = param[1];
        }

        const queryParams = [];
        queryParams.push(encodeURIComponent('start') + '=' + encodeURIComponent(milisecs.start));
        queryParams.push(encodeURIComponent('appId') + '=' + encodeURIComponent(exam.appId));
        queryParams.push(encodeURIComponent('type') + '=' + encodeURIComponent(exam.type));
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: this.props.match.path,
            search: '?' + queryString
        });

        axios.post("/operationRoom/getAllAvailable", milisecs)
            .then(res => {
                let data = [];
                for(var i = 0; i < res.data.length; i++) {
                    if(exam.type === 'EX') {
                        if(res.data[i].name === 'Ordinacija') {
                            data.push(res.data[i]);
                        }
                    } else {
                        if(res.data[i].name === 'Operaciona sala') {
                            data.push(res.data[i]);
                        }
                    }
                }
                this.setState({ operationRooms: data });
            })
            .catch(err => {
                this.setState({ operationRooms: [] });
                console.log(err);
            });
    }



    render() {
        console.log(this.state.changeDate);
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
                            <center><Button id={"show_room_calendar_" + original.roomId} type='green' click={() => this.showScheduleHandler(original)}>Show calendar</Button></center>),
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
                    pageSize={(this.state.operationRooms.length > 5) ? 5 : this.state.operationRooms.length}
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id
                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                    }}
                />

            );
        }

        let content = null;
        if (this.props.fromRequests) {
            if (this.state.operationRooms !== null) {
                if (this.state.operationRooms.length === 0) {
                    content = (
                        <div>
                            <Button type='green' style={{ marginBottom: '25px' }} click={() => this.props.show(false)}>Back</Button>
                            <div style={{ display: 'flex', float: 'right' }}>
                                <p style={{ marginLeft: '20px' }}>There are no rooms available for this appointment.</p>
                                <div className={classes.Checkdate}>
                                    <h5>Search available rooms for date</h5>
                                    <div className={classes.Available}>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            timeCaption="time"
                                            dateFormat="yyyy-MM-dd, h:mm aa" />

                                        <Button
                                            type='green'
                                            style={{ marginLeft: '20px', padding: '7px 15px' }}
                                            click={this.onSearchHandlerFromRequest}>Search</Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                } else {
                    content = (
                        <div>
                            <Button type='green' style={{ marginBottom: '25px' }} click={() => this.props.show(false)}>Back</Button>
                            <p>List of available rooms for selected appointment.</p>
                        </div>
                    );

                }
            }
        } else {
            content = (
                <Auxiliary>
                    <div style={{ display: 'flex' }}>
                        <h4>Add new room</h4>
                        <div
                            style={{ margin: '0px 10px' }}
                            onClick={() => this.setState({ addForm: true, showRoomRedails: false })}>
                            <img src={plusimg} className={classes.Image} />
                        </div>
                        <div className={classes.Checkdate}>
                            <h5>Search available rooms for date</h5>
                            <div className={classes.Available}>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="yyyy-MM-dd, h:mm aa" />

                                <Button
                                    type='green'
                                    style={{ marginLeft: '20px', padding: '7px 15px' }}
                                    click={this.onSearchHandler}>Search</Button>
                            </div>
                        </div>
                    </div>
                </Auxiliary>
            )
        }

        if (this.state.showRoomRedails !== false && this.state.appointments !== null) {

            roomDetails = <RoomAppointments
                changeDate={this.state.changeDate}
                fromRequests={this.props.fromRequests}
                roomName={this.state.roomName}
                roomNumber={this.state.roomNumber}
                appointments={this.state.appointments}
                roomId={this.state.roomId}
                back={this.showHideHandler} />
        } else if (this.state.addForm) {
            roomDetails = <div className="login-form-1"><OperationRoomForm header={"Create new room"} closeModal={this.closeModalHandler} pushNewRoom={this.pushNewRoom} back={this.showHideHandler} /></div>
        }

        return (
            <Auxiliary>
                <div
                    className="col-7 login-form-1"
                    style={{ marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%' }}
                    hidden={this.state.showRoomRedails || this.state.addForm}>

                    <div style={{ display: 'flex' }}>
                        {content}
                    </div>
                    {table}
                </div>
                <div
                    className='col-7 login-form-1'
                    style={{ marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%' }}
                    hidden={!this.state.showRoomRedails}>

                    {roomDetails}
                </div>

                <div
                    className='col-7'
                    style={{ marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%' }}
                    hidden={!this.state.addForm}>

                    {roomDetails}
                </div>
                <Modal show={this.state.modalOpen} modalClosed={this.closeModalHandler}>
                    <OperationRoomForm back={this.showHideHandler} room={this.state.room} closeModal={this.closeModalHandler} replaceRoom={this.replaceRoom} />
                </Modal>
            </Auxiliary>
        );
    }
}

export default withRouter(OperationRooms);