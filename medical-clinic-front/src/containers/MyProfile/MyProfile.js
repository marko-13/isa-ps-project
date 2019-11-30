import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import axios from '../../axios';

import Layout from '../../hoc/Layout/Layout';
import UserDetailsCard from '../../components/UserDetailsCard/UserDetailsCard';


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
        }
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
            console.log('NEMA TOKENA!');
        }
    }

    render() {

        let userDetails = null;

        if (this.state.isAuth) {
            userDetails = (
                <Layout>
                    <UserDetailsCard user={this.state.user}/>
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