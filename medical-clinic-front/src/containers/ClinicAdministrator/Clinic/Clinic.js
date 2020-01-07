import React, { Component } from 'react';

import ClinicInfo from '../../../components/Clinic/ClinicInfo/ClinicInfo';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

class Clinic extends Component {
    render() {
        return (
            <Auxiliary>
                <div className='col-6'>
                    <ClinicInfo />
                </div>
                <div className='col-6'>
                    <h1>MAPA</h1>
                </div>
            </Auxiliary>
        );
    }
}

export default Clinic;