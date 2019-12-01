import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import axios from '../../axios';

import Layout from '../../hoc/Layout/Layout';
import UserDetailsCard from '../../components/UserDetailsCard/UserDetailsCard';
import Modal from '../../components/UI/Modal/Modal';
import UserDataForm from './UserDataForm/UserDataForm';
import UserPasswordChangeForm from './UserPasswordChangeForm/UserPasswordChangeForm';


class MyProfile extends Component {

    state = {
        isAuth: false,
        user: {
            role: '',
            name: '',
            lastname: '',
            email: '',
            jmbg: '',
            review: '',
            shift: '',
            clinic: '',
            clinicalCenterId: ''
        },
        changingData: false,
        changingPassword: false
    }

    componentDidMount() {

        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const role = decodedToken.role.toLowerCase();

            axios.get('/user/profile', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(user => {

                    const updatedUser = {
                        ...this.state.user
                    };

                    updatedUser.role = role;
                    updatedUser.name = user.data.name;
                    updatedUser.lastname = user.data.lastname;
                    updatedUser.email = user.data.email
                    updatedUser.jmbg = user.data.jmbg;
                    updatedUser.review = user.data.review;
                    updatedUser.shift = user.data.shift;
                    updatedUser.clinic = user.data.clinic;
                    updatedUser.clinicalCenterId = user.data.clinicalCenterId;

                    this.setState({ user: updatedUser, isAuth: true })
                })
                .catch(err => {
                    this.setState({ isAuth: false });
                    console.log(err);
                })
        } else {
            this.setState({ isAuth: false });
        }
    }

    changingDataShowHandler = () => {
        this.setState({changingData: true});
    }

    changingDataCancelHandler = () => {
        this.setState({changingData: false});
    }

    changingPasswordShowHandler = () => {
        this.setState({changingPassword : true});
    }

    changingPasswordCancelHandler = () => {
        this.setState({changingPassword : false});
    }


    render() {

        let userDetails = null;

        if (this.state.isAuth) {
            userDetails = (
                <Layout>
                    <UserDetailsCard
                         user={this.state.user}
                         showDataModal={this.changingDataShowHandler} 
                         showPasswordModal={this.changingPasswordShowHandler}/>
                    <Modal 
                        show={this.state.changingData} 
                        modalClosed={this.changingDataCancelHandler}>
                        <UserDataForm 
                            user={this.state.user} 
                            closeModal={this.changingDataCancelHandler}/>
                    </Modal>

                    <Modal 
                        show={this.state.changingPassword} 
                        modalClosed={this.changingPasswordCancelHandler}>
                        <UserPasswordChangeForm closeModal={this.changingPasswordCancelHandler} />
                    </Modal>
                </Layout>
            );
        }else{
            userDetails = <h1>Unauthorized!</h1>
        }

        return (
            userDetails
        );
    }

};

export default MyProfile;