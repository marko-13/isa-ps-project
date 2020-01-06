import React, { Component } from 'react';
import jwt from 'jsonwebtoken';


class ClinicInfo extends Component {

    state = {
        error: false
    }

    componentDidMount() {
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const userId = decodedToken.userId;

            

        }else{
            this.setState({error: true});
        }
    }

    render() {
        return (
            <div>
                Zdravos
            </div>
        );
    }
}

export default ClinicInfo;