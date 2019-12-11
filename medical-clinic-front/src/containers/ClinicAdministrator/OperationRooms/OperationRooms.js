import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import Button from '../../../components/UI/Button/Button';

class OperationRooms extends Component {

    state = {
        operationRooms: null,
        roomId: null,
        showRoomRedails: false
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



    render() {

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

                            this.setState({roomId: rowInfo.original.roomId, showRoomRedails: true});
                            //poziv ka backendu za dobijanje informacija o svim terminimo o konkretnoj sali
                            //findAllByOperatiomRoomId

                        }
                    })} />
                    
            );
        }

        if(this.state.showRoomRedails !== false){
            roomDetails = (
                <div>
                    <h1>Room,appointment,doctor...</h1>
                </div>
            );
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