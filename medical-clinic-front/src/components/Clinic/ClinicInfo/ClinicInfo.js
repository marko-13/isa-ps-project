import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import axios from '../../../axios';

import classes from './ClinicInfo.module.css';
import edit from '../../../assets/images/edit.png';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Modal from '../../UI/Modal/Modal';
import EditClinic from '../../Forms/EditClinic/EditClinic';

class ClinicInfo extends Component {

    state = {
        error: false,
        clinic: null,
        modalOpen: false
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const userId = decodedToken.userId;

            axios.get('/clinics/getByAdmin/' + userId)
                .then(clinic => this.setState({ clinic: clinic.data }))
                .catch(err => console.log(err));

        } else {
            this.setState({ error: true });
        }
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

        this.setState({clinic: clinic});
    }

    render() {

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

                            <h5>Clinic review (0-10): <span className={classes.Review}>{this.state.clinic.review}</span></h5>
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