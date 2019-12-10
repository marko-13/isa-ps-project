import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';
import moment from 'moment';

import Button from '../../../components/UI/Button/Button';
import classes from './Leaves.module.css';
import Modal from '../../../components/UI/Modal/Modal';



class Leaves extends Component {

    state = {
        users: null,
        leaveID: null,
        isModalOpen: false,
        msg: "",
        sentEmail: ""
    }

    componentDidMount() {
        this.getLeaves();
    }

    getLeaves = () => {
        axios.get('/leave/getAll')
            .then(leaves => this.setState({ users: leaves.data }))
            .catch(err => console.log(err));
    }

    approveLeave = (id, email) => {
        axios.post('leave/approveLeave/' + id, email, { headers: { "Content-Type": "text/plain" } })
            .then(response => {
                this.getLeaves();
                alert('Leave approved!')
            })
            .catch(err => console.log(err));
    }

    closeModal = () => {
        this.setState({ isModalOpen: false, msg: "" });
    }

    onCloseHandler = (event) => {
        event.preventDefault();
        this.closeModal();
    }

    denyLeave = (event) => {
        event.preventDefault();

        const denial = {
            email: this.state.sentEmail,
            message: this.state.msg
        }

        axios.post('/leave/denyLeave/' + this.state.leaveID, denial)
            .then(response => {
                this.setState({ leaveID: null, msg: "", sentEmail: "" });
                this.getLeaves();
            })
            .catch(err => console.log(err));

        this.closeModal();
    }


    render() {

        let table = null;

        if (this.state.users !== null) {
            const data = this.state.users;

            const columns = [{
                Header: 'Requests for leave of absence',
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
                        id: 'date_start',
                        Header: 'Start',
                        accessor: d => {
                            return moment(d.start).format("DD-MMM-YYYY");
                        }
                    },
                    {
                        id: 'date_end',
                        Header: 'End',
                        accessor: d => {
                            return moment(d.end).format("DD-MMM-YYYY");
                        }
                    },
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button type='green' click={() => this.approveLeave(original.leaveID, original.email)}>Approve</Button></center>),
                        filterable: false,
                        sortable: false
                    },
                    {
                        Header: "",
                        Cell: ({ original }) => (
                            <center><Button type='red' click={() => this.setState({ isModalOpen: true, leaveID: original.leaveID, sentEmail: original.email })}>Deny</Button></center>),
                        filterable: false,
                        sortable: false
                    }]
            }];

            table = (
                <div className={classes.Row}>
                    <ReactTable
                        className={classes.Table}
                        data={data}
                        columns={columns}
                        className="-striped"
                        pageSize={10}
                        filterable={true}
                        style={{ width: '85vw' }}
                    />
                    <Modal show={this.state.isModalOpen} modalClosed={this.closeModal}>
                        <h4>Write the reason of denial</h4>
                        <form>
                            <textarea rows="10" cols="50" value={this.state.msg} onChange={(event) => this.setState({ msg: event.target.value })}></textarea>
                            <div style={{ float: 'right' }}>
                                <Button style={{ margin: '0px 5px' }} type='green' click={this.onCloseHandler}>Close</Button>
                                <Button style={{ margin: '0px 5px' }} type='green' click={this.denyLeave}>Confirm</Button>
                            </div>
                        </form>
                    </Modal>
                </div>
            );
        }

        return table;
    }
}

export default Leaves;