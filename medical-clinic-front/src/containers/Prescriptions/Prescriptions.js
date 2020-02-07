import React, { Component } from 'react';
import axios from '../../axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import './Prescriptions.css';

class Prescriptions extends Component {

    state = {
        prescriptions: []
    }


    getAllPrescriptions = () => {
        axios.get('/prescriptions/approve', {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
            .then(prescriptions => {
                console.log(prescriptions.data);
                let newPrescriptions = [];
                for(var i = 0; i < prescriptions.data.length; i++) {
                    if(prescriptions.data[i].drugs.length !== 0) {
                        newPrescriptions.push(prescriptions.data[i]);
                    }
                }
                this.setState({prescriptions: newPrescriptions});
            })
            .catch(err => console.log(err));
    }

    approvePrescritpion = (id) => {
        let newPrescriptions = [...this.state.prescriptions];
        let savePrescription = null;
        for(var i = 0; i < newPrescriptions.length; i++) {
            if(newPrescriptions[i].id === id) {
                savePrescription = newPrescriptions[i];
                newPrescriptions.splice(i, 1);
                break;
            }
        }

        this.setState({prescriptions: newPrescriptions});

        axios.post('/prescriptions/approve/' + id, " ", {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
             .then(rsp => {
                alert("Successfully approved prescription")
                //this.getAllPrescriptions();
            })
             .catch(err => {
                if(savePrescription !== null) {
                    newPrescriptions.push(savePrescription);
                    this.setState({prescriptions: newPrescriptions});
                }
                alert("Not able to approve prescription");
                console.log(err);
            });
    }

    componentDidMount() {
        this.getAllPrescriptions();
    }

    render() {

        let approvePrescriptions = null;
        let smt = localStorage.getItem("token");
        console.log(this.state.prescriptions)
        if(this.state.prescriptions.length !== null) {
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
                <div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
                <div className = 'react-custom-table'>
                    <ReactTable data = {this.state.prescriptions}
                    pageSize={(this.state.prescriptions.length > 10) ? 10 : this.state.prescriptions.length}
                    getTrProps={(state, rowInfo, column, instance) => ({
                        onClick: e => console.log('A row was clicked!')
                    })}
                    columns = {columns}
                    filterable = {true}/>
                </div>
                </div>
            );

        }

        return (null);
        /*
        let coins = Object.keys(this.state.prescriptions.data).map((key) => (
            {key}
        ));*/

        //console.log(smt);
        /*
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
        );*/
    }
}

export default Prescriptions;