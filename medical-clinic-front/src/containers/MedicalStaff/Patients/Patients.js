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
                <Route path={this.props.match.path + '/medical-history'} component={MedicalHistory}></Route>
                <Route path='/homepage/doctor/patients/start-exam' render={() => <h1>EXAM</h1>}></Route>        
            </Auxiliary>
        );
    }
}

export default Patients;