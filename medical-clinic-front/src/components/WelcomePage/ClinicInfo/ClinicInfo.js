import React from 'react';

const ClinicInfo = (props) => {
    return (
        <div>
            <h2>Medical Center</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Quisque lectus lorem, gravida vitae molestie eu, lobortis sit amet augue.
                Curabitur ut ornare nulla, eu eleifend justo. Praesent feugiat ut sem quis vulputate.
                Vestibulum cursus semper orci. Sed tempor libero ut justo sollicitudin, vitae efficitur enim accumsan.</p>
            <button type='button' className='btn btn-info'>Show more</button>
        </div>
    );
};

export default ClinicInfo;