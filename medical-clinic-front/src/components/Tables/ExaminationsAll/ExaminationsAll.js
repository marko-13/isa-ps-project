import React, { Component } from 'react';
import axios from '../../../axios';
import ReactTable from 'react-table-6';

import Button from '../../../components/UI/Button/Button';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Modal from '../../../components/UI/Modal/Modal';
import EditExam from '../../Forms/EditExam/EditExam';

class ExaminationsAll extends Component {

    state = {
        exams: null,
        modalOpen: false,
        selectedExam: null
    }

    componentDidMount() {
       this.getAllExams();
    }

    closeModalHandler = () => {
        this.setState({modalOpen: false});
    }

    openModalHandler = (exam) => {
        this.setState({selectedExam: exam})
        this.setState({modalOpen: true});
    }

    getAllExams = () => {
        axios.get("service/getAll")
        .then(res => this.setState({exams: res.data}))
        .catch(err => {
            this.setState({exams: null});
        });
    }

    updateExams = updatedExam => {
        this.setState({
            exams: this.state.exams.map(ex => (ex.id === updatedExam.id ? updatedExam : ex))
        })
    }

    removeExamHandler = id => {
        console.log('usao '+ id);
        axios.post("/service/remove/" + id, null)
            .then(res => {
                let newExams = [...this.state.exams];
                newExams = newExams.filter(exam => exam.id !== id);
                this.setState({exams: newExams});
            })
            .catch(err => alert('Unable to remove medical examination.\nReason: ' + err.response.data));
    }

    render() {
        let table = null;

        if (this.state.exams !== null) {
            if (this.state.exams.length === 0) {
                table = <h1>There are no medical exams in this clinic.</h1>
            }
            else {
                const columns = [{
                    Header: 'List of all medical examinations',
                    columns: [
                        {
                            id: 'name',
                            Header: 'Name',
                            accessor: d => d.serviceType
                        },
                        {
                            id: 'price',
                            Header: 'Price',
                            accessor: d => d.price
                        },
                        {
                            Header: "",
                            Cell: ({ original }) => (
                                <center><Button type='black' click={() => this.openModalHandler(original)}>Edit</Button></center>),
                            filterable: false,
                            sortable: false
                        },
                        {
                            Header: "",
                            Cell: ({ original }) => (
                                <center><Button type='red' click={() => this.removeExamHandler(original.id)}>Remove</Button></center>),
                            filterable: false,
                            sortable: false
                        }]
                }];

                table = (
                    <ReactTable
                        data={this.state.exams}
                        columns={columns}
                        className="-striped"
                        pageSize={7}
                        filterable={true}
                        defaultFilterMethod={(filter, row, column) => {
                            const id = filter.pivotId || filter.id
                            return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                        }}
                        pageSize={(this.state.exams.length > 7) ? 7 : this.state.exams.length}
                    />
                )
            }
        }else{
            table = <h1>Something is not right.</h1>
        }

        return (
            <Auxiliary>
                {table}
                <Modal show={this.state.modalOpen} modalClosed={this.closeModalHandler}>
                    <EditExam exam={this.state.selectedExam} closeModal={this.closeModalHandler} updateExams={this.updateExams}/>
                </Modal>
            </Auxiliary>
        );
    }
}

export default ExaminationsAll;