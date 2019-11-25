import React from 'react';

import classes from './ClinicInfo.module.css';
import Button from '../../UI/Button/Button';

const ClinicInfo = (props) => {
    return (
        <div className={classes.ClinicInfo}>
            <h2>Medical Center</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Quisque lectus lorem, gravida vitae molestie eu, lobortis sit amet augue.
                Curabitur ut ornare nulla, eu eleifend justo. Praesent feugiat ut sem quis vulputate.
                Vestibulum cursus semper orci. Sed tempor libero ut justo sollicitudin, vitae efficitur enim accumsan.</p>
            <Button type='button' className='btnSubmit'>Show more</Button>
        </div>
    );
};

export default ClinicInfo;