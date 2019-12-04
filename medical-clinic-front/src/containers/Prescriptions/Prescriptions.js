import React, { Component } from 'react';
import axios from '../../axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import './Prescriptions.css';

class Prescriptions extends Component {

    state = {
        prescriptions: null
    }


    getAllPrescriptions = () => {
        axios.get('/prescriptions/approve', {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
            .then(prescriptions => this.setState({prescriptions: prescriptions}))
            .catch(err => console.log(err));
    }

    approvePrescritpion = (id) => {
        axios.post('/prescriptions/approve/' + id, " ", {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
             .then(rsp => {
                console.log(rsp);
                this.getAllPrescriptions();
            })
             .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getAllPrescriptions();
    }


    render() {

        let approvePrescriptions = null;
        let smt = localStorage.getItem("token");
        console.log(this.state.prescriptions)
        if(this.state.prescriptions !== null) {
            const columns = [{
                Header: 'Not approved prescriptions',
                columns: [
                {
                    id: 'id',
                    Header: 'id',
                    accessor: d => "Prescription " + d.id},
                {
                    Header: "",
                    Cell: ({ original }) => (
                        <button className="btnSubmit" onClick={() => this.approvePrescritpion(original.id)}>
                            Approve
                        </button>),
                    filterable: false,
                    sortable: false
                }
                ]
            }];

            return(
                <div className = 'react-custom-table'>
                <ReactTable data = {this.state.prescriptions.data}
                pageSize={(this.state.prescriptions.data.length > 10) ? 10 : this.state.prescriptions.data.length}
                getTrProps={(state, rowInfo, column, instance) => ({
                    onClick: e => console.log('A row was clicked!')
                })}
                columns = {columns}
                filterable = {true}/>
                </div>
            );

        }

        return (null);
        /*
        let coins = Object.keys(this.state.prescriptions.data).map((key) => (
            {key}
        ));*/

        console.log(smt);

        let pres = null;
        console.log(this.state.prescriptions)
        if(this.state.prescriptions !== null){
            pres = this.state.prescriptions.data.map((el) => {
            return (    
                    <div key = {el.id}><p>Prescription {el.id}</p><button onClick={() => this.approvePrescritpion(el.id)}>Approve</button></div>
                    
                 );
        })
        }

        
        return (
            <div style={{textAlign: 'center', width: '100%'}}>
                {pres}
            </div>
        );
    }
}

export default Prescriptions;