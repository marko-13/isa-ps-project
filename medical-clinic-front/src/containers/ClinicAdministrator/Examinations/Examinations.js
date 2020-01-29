import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import ExaminationsAll from '../../../components/Tables/ExaminationsAll/ExaminationsAll';
import NewExam from '../../../components/Forms/NewExam/NewExam';

class Examinations extends Component {
    render() {
        return (
            <Auxiliary>
                <div className='col-6'>
                    <ExaminationsAll/>
                </div>
                <div className='col-6'>
                    <NewExam />
                </div>
            </Auxiliary>
        );
    }
}

export default Examinations;