import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import axios from '../../../axios';

import classes from './ClinicInfo.module.css';
import edit from '../../../assets/images/edit.png';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Modal from '../../UI/Modal/Modal';
import EditClinic from '../../Forms/EditClinic/EditClinic';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class ClinicInfo extends Component {

    state = {
        error: false,
        clinic: null,
        modalOpen: false,
        totalPrice: 0
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const userId = decodedToken.userId;

            axios.get('/clinics/getByAdmin/' + userId)
                .then(clinic => {
                    this.setState({ clinic: clinic.data });
                    this.getServices();
                })
                .catch(err => console.log(err));

        } else {
            this.setState({ error: true });
        }
    }

    getServices = () => {

        let sum = 0;

        axios.get('/service/getAllHeldAndFromOneYearAndFromClinic/')
            .then(res => {
                res.data.map(s => {
                    sum += s.price;
                })
                this.setState({ totalPrice: sum });
            })
            .catch(err => console.log(err));
    }

    modalCloseHandler = () => {
        this.setState({ modalOpen: false });
    }

    modalOpenHandler = () => {
        this.setState({ modalOpen: true });
    }

    updateClinicHandler = (updatedClinic) => {

        const clinic = {
            ...updatedClinic
        }

        this.setState({ clinic: clinic });
    }

    render() {

        console.log(this.state.clinic);

        let ret = null;

        if (this.state.clinic === null) {
            ret = <h1>Ucitavanje...</h1>
            if (this.state.error) {
                ret = <h1>Doslo je do greske</h1>
            }
        } else {
            ret = (
                <Auxiliary>
                    <div>
                        <div className={classes.Header}>
                            <h3>Clinic details</h3>
                        </div>
                        <img src={edit} className={classes.Edit} onClick={this.modalOpenHandler} />
                        <div className={classes.Klinika}>
                            <h4>Name: {this.state.clinic.name}</h4>
                            <h5>Address: {this.state.clinic.address}</h5>

                            <h6 className={classes.Description}>Description:</h6>
                            <p style={{ paddingLeft: '8px', marginBottom: '25px' }}>{this.state.clinic.description}</p>

                            <h5>Clinic review (0-5): <span className={classes.Review}>{Number(this.state.clinic.review / this.state.clinic.reviewCount).toFixed(2)}</span></h5>
                            <hr></hr>
                        </div>
                        <div className='row'>
                            <div className={classes.Chart + ' col'}>
                                <h4>Clinic income in last year : {this.state.totalPrice}</h4>
                                {/* <LineChart
                                    width={800}
                                    height={300}
                                    style={{ margin: 'auto' }}
                                    data={data}
                                    margin={{
                                        top: 15, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart> */}
                            </div>
                        </div>
                    </div>
                    <Modal show={this.state.modalOpen} modalClosed={this.state.modalCloseHandler}>
                        <EditClinic clinic={this.state.clinic} closeModal={this.modalCloseHandler} updateClinic={this.updateClinicHandler} />
                    </Modal>
                </Auxiliary>
            );
        }


        return ret;
    }
}

export default ClinicInfo;