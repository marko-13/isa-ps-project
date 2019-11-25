import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';

import HomepageToolbar from '../../components/Navigation/HomepageToolbar/HomepageToolbar';
import classes from './Layout.module.css';

class Layout extends Component {


    render() {
        return (
            <Auxiliary>
                <HomepageToolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;