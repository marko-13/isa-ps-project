import React, {Component} from 'react';

import Layout from '../../hoc/Layout/Layout';
import UserDetailsCard from '../../components/UserDetailsCard/UserDetailsCard';


class MyProfile extends Component {

    state = {

    }

    componendDidMount() {

    }

    render() {
        return (
            <Layout>
                <UserDetailsCard/>
            </Layout>
        );
    }

};

export default MyProfile;