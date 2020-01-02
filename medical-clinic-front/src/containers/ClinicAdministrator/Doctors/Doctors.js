import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';

import Button from '../../../components/UI/Button/Button';
import NewDoctor from '../../../components/Forms/NewDoctor/NewDoctor';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

class Doctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: null
        }
        this.getAllDoctors = this.getAllDoctors.bind(this);
    }


    componentDidMount() {
        this.getAllDoctors();
    }

    getAllDoctors() {
        axios.get('doctor/getAll')
            .then(response => {
                console.log('adasdsadas');
                this.setState({ doctors: response.data });
            })
            .catch(err => console.log(err));
    }

    render() {

        console.log(this.state);

        let table = null;

        if (this.state.doctors !== null) {
            const data = this.state.doctors;

            const columns = [{
                Header: 'List of doctors',
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
                        id: 'shift',
                        Header: 'Shift',
                        accessor: d => d.shift
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
                    data={data}
                    columns={columns}
                    className="-striped"
                    pageSize={10}
                    filterable={true}
                    pageSize={(this.state.doctors.length > 10) ? 10 : this.state.doctors.length}
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id
                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                    }}
                />
            );
        }

        return (
            <Auxiliary>
                <div className='col-6'>
                    {table}
                </div>
                <div className='col-6'>
                    <NewDoctor getAllDoctors={this.getAllDoctors} />
                </div>
            </Auxiliary>
        );
    }
}

export default Doctors;