import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './HomepageToolbarItem.module.css';

const HomepageToolbarItem = (props) => {
    return (
        <li className={classes.NavigationItem} style={props.style}>
            <NavLink to={props.link} activeClassName={classes.active}>
                {props.children}
            </NavLink>
        </li>
    );
};

export default HomepageToolbarItem;