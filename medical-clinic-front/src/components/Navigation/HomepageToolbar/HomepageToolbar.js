import React from 'react';

import Logo from '../../UI/Logo/Logo';
import classes from './HomepageToolbar.module.css';
import HomepageToolbarItems from '../HomepageToolbarItems/HomepageToolbarItems';

const HomepageToolbar = (props) => {
    return (
        <div>
            <header className={classes.Toolbar}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav className={classes.DesktopOnly}>
                     <HomepageToolbarItems />
                </nav>
            </header>
        </div>
    );
};

export default HomepageToolbar;