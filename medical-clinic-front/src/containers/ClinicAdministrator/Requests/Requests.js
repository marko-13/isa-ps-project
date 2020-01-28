import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import { Route } from 'react-router-dom';

import RequestsTable from '../../../components/Tables/RequestsTable/RequestsTable';
import OperationRooms from '../OperationRooms/OperationRooms';

class Requests extends Component {
    render() {
        return (
            <Auxiliary>
                <RequestsTable/>
                {/* <Route path={this.props.match.path + '/rooms'} component={() => <OperationRooms/>}></Route>        */}
            </Auxiliary>
        );
    }
}

export default Requests;