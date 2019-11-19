import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';

import Toolbar from '../../components/UI/Toolbar/Toolbar.js';

class Layout extends Component {


    render() {
        return (
            <Auxiliary>
                <Toolbar />
                <main>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;