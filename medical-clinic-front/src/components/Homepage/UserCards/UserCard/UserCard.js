import React from 'react';

import classes from './UserCard.module.css';
import Button from '../../../UI/Button/Button';


const UserCard = (props) => {
    return (
            <div className={classes.CardItem + " col-sm-4 text-center"} style={{minWidth: '20rem'}}>
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">{props.tx}</p>
                        <Button type='grey'>{props.but}</Button>
                    </div>
                </div>
            </div>
    );
};

export default UserCard;
