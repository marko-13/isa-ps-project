import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';

class DoctorsReview extends Component {

    state = {
        doctors: []
    }


    componentDidMount() {
        axios.get('/doctor/getAllFromClinicAndNotDeleted')
            .then(res => this.setState({doctors: res.data}))
            .catch(err => console.log(err));
    }



    render() {

        let table = null;

        if(this.state.doctors.length === 0){
            table = <h2>Loading...</h2>
        }else if(this.state.doctors === null){
            table = <h2>Error loading doctors!</h2>
        }else {

            const columns = [{
                Header: 'List of all doctors',
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
                        id: 'totalreviews',
                        Header: 'Total reviews',
                        accessor: d => d.reviewCount
                    },
                    {
                        id: 'review',
                        Header: 'Review',
                        accessor: d => Number(d.review / d.reviewCount).toFixed(2)
                    }]
            }];


            table = (
                <ReactTable
                    data={this.state.doctors}
                    columns={columns}
                    className="-striped"
                    pageSize={7}
                    filterable={true}
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id
                        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                    }}
                    pageSize={(this.state.doctors.length > 7) ? 7 : this.state.doctors.length}
                />
            )
        }

        return table;
    }
}

export default DoctorsReview;