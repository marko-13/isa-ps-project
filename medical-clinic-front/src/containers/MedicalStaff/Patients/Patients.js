import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import PatientsTable from '../../../components/Tables/PatientsTable/PatientsTable';
import UserInfo from '../../../components/Homepage/UserInfo/UserInfo';

class Patients extends Component {
    render() {
        return (
            <Auxiliary>
                <PatientsTable/>
                <Route path='/homepage/doctor/patients/medical-history' render={() => <h1>MED HIS</h1>}></Route>
                <Route path='/homepage/doctor/patients/start-exam' render={() => <h1>EXAM</h1>}></Route>        
            </Auxiliary>
        );
    }
}

export default Patients;