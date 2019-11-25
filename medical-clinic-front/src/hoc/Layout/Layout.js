import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';

import Toolbar from '../../components/UI/Toolbar/Toolbar.js';
import HomepageToolbar from '../../components/Navigation/HomepageToolbar/HomepageToolbar';

class Layout extends Component {


    render() {
        return (
            <Auxiliary>
                <HomepageToolbar />
                <main>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;