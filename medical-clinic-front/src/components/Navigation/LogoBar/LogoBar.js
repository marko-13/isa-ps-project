import React from 'react';

import classes from './LogoBar.module.css';
import Logo from '../../UI/Logo/Logo';

const LogoBar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav >

            </nav>
        </header>
        
    );
};

export default LogoBar;