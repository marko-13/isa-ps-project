import React from 'react';

const UserCards = (props) => {
    return (
        <div className='col-8' style={{marginTop: '20px'}}>
            <div className='container'>
                <div className='row'>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default UserCards;