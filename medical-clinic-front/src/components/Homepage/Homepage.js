import React from 'react';
import jwt from 'jsonwebtoken';

import HomepageNurse from '../../containers/HomepageNurse/HomepageNurse';
import HomepagePatient from '../../containers/HomepagePatient/HomepagePatient';
import Layout from '../../hoc/Layout/Layout';

const Homepage = () => {

    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const role = decodedToken.role.toLowerCase();
    const name = decodedToken.name;
    const lastname = decodedToken.lastname;

    let page = null;


    switch(role){
        case 'nurse':
            page = <HomepageNurse  name={name} lastname={lastname} role={role}/>
            break;
        case 'patient':
            page = <h1>Pacijent</h1>
            page = <HomepagePatient name={name} lastname={lastname} role={role}/>
            break;
        case 'doctor':
            page = <h1>Doktor</h1>
            break;
        case 'adminclinic':
            page = <h1>Admin clinic</h1>
            break;
        case 'adminclinicalcenter':
             page = <h1>Admin clinic center</h1>
            break;
        default:
            page = <h1>Nije logovan!</h1>
            break;
    }

    return (
        <Layout>
            {page}
        </Layout>
    );
};

export default Homepage;