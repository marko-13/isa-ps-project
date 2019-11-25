import React from 'react';

import mcLogo from '../../../assets/images/MC_logo.png';
import classes from './Logo.module.css';

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={mcLogo} alt='MCLogo' width={props.width} height='auto'/>
        </div>
    );
};

export default Logo;