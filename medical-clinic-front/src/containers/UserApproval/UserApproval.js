import React, { Component } from 'react';
import axios from '../../axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

class UserApproval extends Component {

    state = {
        users: null,
        isModalOpen: false,
        userDenyId: null,
        msg: ""
    }

    getAllUnapproved = () => {
    	axios.get('/admin-clinic-center/approve', {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
            .then(users => {
            	this.setState({users: users});
            	console.log(users)
            })
            .catch(err => console.log(err));
    }

    approveUser = (id) => {
        axios.post('/admin-clinic-center/approve/' + id, " ", {headers: { Authorization: 'Bearer '.concat(localStorage.getItem("token")) }})
             .then(rsp => {
                console.log(rsp);
                this.getAllUnapproved();
            })
             .catch(err => console.log(err));
    }

    denyUser = (event) => {
    	event.preventDefault();

    	let config = {
    		headers: {
    			Authorization: 'Bearer '.concat(localStorage.getItem("token")),
    			'Content-Type': "text/plain"
    		}
    	}
        axios.post('/admin-clinic-center/deny/' + this.state.userDenyId, this.state.msg.toString(), config)
             .then(rsp => {
                console.log(rsp);
                this.getAllUnapproved();
            })
             .catch(err => console.log(err));
        this.setState({userDenyId: null, msg: ""});
        this.closeModal();
    }

    componentDidMount() {
        this.getAllUnapproved();
    }

    closeModal = () => {
    	this.setState({isModalOpen : false, msg : ""});
    }

    onCloseHandler = (event) => {
        event.preventDefault();
        this.closeModal();
    }

    render() {

        if(this.state.users !== null) {
            const columns = [{
                Header: '',
                columns: [
                {
                    id: 'Email',
                    Header: 'email',
                    accessor: d => d.email
                },
                {
                	id: 'firstName',
                	Header: 'First name',
                	accessor: d => d.name
                },
                {
                	id: 'lastName',
                	Header: 'Last name',
                	accessor: d => d.lastname
                },
                {
                    Header: "",
                    Cell: ({ original }) => (
                        <center><button className="btnSubmit" onClick={() => this.approveUser(original.id)}>
                            Approve
                        </button></center>),
                    filterable: false,
                    sortable: false
                },
                {
                    Header: "",
                    Cell: ({ original }) => (
                        <center><button className="btnSubmit" onClick={() => {
                        	this.setState({userDenyId: original.id});
                        	this.setState({isModalOpen: true});
                        }
                    }>
                           	Deny
                        </button></center>),
                    filterable: false,
                    sortable: false
                }
                ]
            }];

            return(
                <div className = 'react-custom-table'>
                <ReactTable data = {this.state.users.data}
                pageSizeOptions={[20, 30, 50, 100, 200, 500]}
                pageSize={(this.state.users.data.length > 10) ? 10 : this.state.users.data.length}
                getTrProps={(state, rowInfo, column, instance) => ({
                    onClick: e => console.log('A row was clicked!')
                })}
                columns = {columns}
                filterable = {true}
                defaultPageSize={100}/>
                <Modal show = {this.state.isModalOpen} modalClosed = {this.closeModal}>
                	<h4>Write the reason of denial</h4>
                	<form>
                		<textarea rows="10" cols="50" value = {this.state.msg} onChange={(event) => this.setState({ msg: event.target.value })}></textarea>
                		<div style={{float: 'right'}}>
                        	<Button style={{ margin: '0px 5px' }} type='green' click={this.onCloseHandler}>Close</Button>
                        	<Button style={{ margin: '0px 5px' }} type='green' click={this.denyUser}>Confirm</Button>
                    	</div>
                	</form>
                </Modal>
                </div>
            );

        }

        return (null);
    }


}

export default UserApproval;