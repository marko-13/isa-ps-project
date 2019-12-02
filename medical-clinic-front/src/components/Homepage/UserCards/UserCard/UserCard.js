import React from 'react';

import classes from './UserCard.module.css';
import Button from '../../../UI/Button/Button';
import {NavLink} from 'react-router-dom';

const UserCard = (props) => {
    return (
            <div className={classes.CardItem + " col-sm-4 text-center"}>
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">{props.cardText}</p>
                        <NavLink to={props.link}>
                          <Button type='grey'>{props.buttonText}</Button>
                        </NavLink>
                    </div>
                </div>
            </div>
    );
};

export default UserCard;
