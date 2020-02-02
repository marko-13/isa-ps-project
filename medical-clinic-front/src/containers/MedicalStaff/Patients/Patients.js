import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import PatientsTable from '../../../components/Tables/PatientsTable/PatientsTable';
import MedicalHistory from './MedicalHistory/MedicalHistory';

class Patients extends Component {
    render() {
        return (
            <Auxiliary>
	            <PatientsTable/>      
            </Auxiliary>
        );
    }
}

export default Patients;