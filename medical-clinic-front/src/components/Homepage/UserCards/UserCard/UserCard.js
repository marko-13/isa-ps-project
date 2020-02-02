import React from 'react';

import classes from './UserCard.module.css';
import Button from '../../../UI/Button/Button';
import {NavLink} from 'react-router-dom';

const UserCard = (props) => {
    if (props.special !== undefined) {
        return (
            <div className={classes.CardItem + (props.full === undefined ? " col-sm-4 text-center" : " col-sm-12 text-center")}>
                <div className={classes.Card}>
                    <div className="card-body">
                        <p className="card-text">{props.cardText}</p>
                          <Button type='grey' click={props.click}>{props.buttonText}</Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
                <div className={classes.CardItem + (props.full === undefined ? " col-sm-4 text-center" : " col-sm-12 text-center")}>
                    <div className={classes.Card}>
                        <div className="card-body">
                            <p className="card-text">{props.cardText}</p>
                            <NavLink to={{pathname: props.link, search: props.query}}>
                              <Button type='grey'>{props.buttonText}</Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
        );
    }
};

export default UserCard;
