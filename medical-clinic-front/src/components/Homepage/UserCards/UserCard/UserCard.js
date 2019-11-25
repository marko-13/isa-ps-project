import React from 'react';

import classes from './UserCard.module.css';
import Button from '../../../UI/Button/Button';


const UserCard = (props) => {
    return (
            <div className={classes.CardItem + " col-sm-4 text-center"}>
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">{props.cardText}</p>
                        <Button type='grey'>{props.buttonText}</Button>
                    </div>
                </div>
            </div>
    );
};

export default UserCard;
