import React, { Component } from 'react';
import NewFastExamination from '../../../components/Forms/NewFastExamination/NewFastExamination';

class FastExam extends Component {
    render() {
        return (
            <div
                className='login-form-1'
                style={{ marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%' }}>
                <NewFastExamination />
            </div>
        );
    }
}

export default FastExam;