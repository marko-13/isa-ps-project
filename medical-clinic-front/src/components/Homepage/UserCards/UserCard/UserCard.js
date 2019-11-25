import React from 'react';

import classes from './UserCard.module.css';
import Button from '../../../UI/Button/Button';


const UserCard = (props) => {
    return (
            <div className={classes.CardItem + " col-sm-4 text-center"}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <Button type='grey'>Go somwhere</Button>
                    </div>
                </div>
            </div>
    );
};

export default UserCard;