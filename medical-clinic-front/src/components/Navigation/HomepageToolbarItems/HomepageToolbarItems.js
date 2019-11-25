import React from 'react';

import classes from './HomepageToolbarItems.module.css';
import HomepageToolbarItem from './HomepageToolbarItem/HomepageToolbarItem';
import Button from '../../UI/Button/Button';

const HomepageToolbarItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <HomepageToolbarItem link='/homepage/profile' exact>My Profile</HomepageToolbarItem>
            <HomepageToolbarItem link='/homepage' exact>Homepage</HomepageToolbarItem>
            <HomepageToolbarItem link='/homepage/clinif-info' exact style={{marginRight: '30px'}}>Clinic Info</HomepageToolbarItem>
            <Button>Logout</Button>
        </ul>
    );
};

export default HomepageToolbarItems;